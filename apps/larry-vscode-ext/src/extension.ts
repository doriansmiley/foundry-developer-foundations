import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { makeSqlLiteThreadsDao } from './threadsDao';
import { Conversation, Message } from './types';
import { findProjectRoot } from './findProjectRoot';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
  // Configure DB path from settings -> env for threadsDao
  try {
    const config = vscode.workspace.getConfiguration('larry');
    const configuredDbPath = config.get<string>('dbPath');
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    const baseUri = workspaceFolder?.uri || vscode.Uri.file(process.cwd());
    const defaultDbPath = vscode.Uri.joinPath(
      baseUri,
      '.larry',
      'db',
      'developer-foundations-threads.sqlite'
    ).fsPath;
    const effectiveDbPath =
      configuredDbPath && configuredDbPath.trim().length > 0
        ? configuredDbPath
        : defaultDbPath;
    process.env['SQL_LITE_DB_PATH'] = effectiveDbPath;
    console.log('Larry DB path configured as:', effectiveDbPath);
  } catch (e) {
    console.warn('Failed to configure Larry DB path from settings:', e);
  }

  const provider = new LarryViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('larryHome', provider, {
      webviewOptions: { retainContextWhenHidden: true },
    })
  );

  // Watch for workspace changes to detect worktree changes
  const workspaceWatcher = vscode.workspace.onDidChangeWorkspaceFolders(() => {
    provider.notifyWorktreeChange();
  });
  context.subscriptions.push(workspaceWatcher);

  // Initial worktree detection
  provider.notifyWorktreeChange();
}

class LarryViewProvider implements vscode.WebviewViewProvider {
  private view: vscode.WebviewView | undefined;
  private runningContainers: Map<string, string> = new Map(); // conversationId -> containerId
  private threadsDao: any;

  constructor(private readonly context: vscode.ExtensionContext) {
    // Initialize ThreadsDao
    this.threadsDao = makeSqlLiteThreadsDao();
  }

  // Database operations
  private async loadSessions(): Promise<void> {
    try {
      const threads = await this.threadsDao.listAll();

      const filteredThreads = threads.filter(
        (thread: any) => thread.appId === 'larry-conversation'
      );

      this.view?.webview.postMessage({
        type: 'sessionsLoaded',
        sessions: filteredThreads,
      });
    } catch (error) {
      console.error('Error loading sessions:', error);
      // Send empty sessions on error
      this.view?.webview.postMessage({
        type: 'sessionsLoaded',
        sessions: [],
      });
    }
  }

  private async loadMessages(conversationId: string): Promise<void> {
    try {
      const { messages } = await this.threadsDao.read(conversationId);
      console.log('Messages:', messages);
      const parsedMessages = JSON.parse(messages || '[]') as Message[];

      this.view?.webview.postMessage({
        type: 'messagesLoaded',
        messages: parsedMessages,
      });
    } catch (error) {
      console.error('Error loading messages:', error);

      // If it's a "thread not found" error, create an empty thread
      if (
        error instanceof Error &&
        error.message.includes('Thread not found')
      ) {
        this.view?.webview.postMessage({
          type: 'messagesLoaded',
          messages: [],
        });
      } else {
        // For other errors, show a user-friendly message
        vscode.window.showErrorMessage(
          `Failed to load messages: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    }
  }

  private async saveMessage(
    conversationId: string,
    message: Message
  ): Promise<void> {
    try {
      // Try to read existing messages, or start with empty array if thread doesn't exist
      let existingMessages = '[]';
      try {
        const thread = await this.threadsDao.read(conversationId);
        existingMessages = thread.messages || '[]';
      } catch (error) {
        // Thread doesn't exist yet, start with empty messages
        console.log('Thread not found, creating new thread with first message');
      }

      const parsedMessages = JSON.parse(existingMessages) as Message[];

      // Add new user message
      parsedMessages.push(message);

      // Save to database (preserve existing worktreeId if available)
      let existingWorktreeId = null;
      try {
        const existingThread = await this.threadsDao.read(conversationId);
        existingWorktreeId = existingThread.worktreeId;
      } catch (e) {
        // Thread doesn't exist yet, worktreeId will be null
      }

      await this.threadsDao.upsert(
        JSON.stringify(parsedMessages),
        'larry-conversation',
        conversationId,
        existingWorktreeId
      );
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  // Docker management methods
  private async buildDockerImage(): Promise<void> {
    try {
      // Find the foundry-developer-foundations project root
      const foundryProjectRoot = await findProjectRoot();
      if (!foundryProjectRoot) {
        throw new Error('Project root not found.');
      }

      const dockerfilePath = vscode.Uri.joinPath(
        vscode.Uri.file(foundryProjectRoot),
        'Codebase.Dockerfile'
      );
      const dockerfileExists = await vscode.workspace.fs
        .stat(dockerfilePath)
        .then(
          () => true,
          () => false
        );

      if (!dockerfileExists) {
        throw new Error(
          `Codebase.Dockerfile not found at ${dockerfilePath.fsPath}`
        );
      }

      await execAsync(`docker build -f Codebase.Dockerfile -t larry-server .`, {
        cwd: foundryProjectRoot,
      });
    } catch (error) {
      console.error('Error building Docker image:', error);
      throw error;
    }
  }

  private async startLarryContainer(conversationId: string): Promise<string> {
    try {
      // Build image if not exists
      await this.buildDockerImage();

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        throw new Error('No workspace folder found');
      }

      // Create .larry directory if it doesn't exist
      const larryDir = vscode.Uri.joinPath(workspaceFolder.uri, '.larry');
      await vscode.workspace.fs.createDirectory(larryDir);

      const containerName = `larry-server-${conversationId}`;

      // Run container with mounted to worktree path
      const { stdout } = await execAsync(
        `docker run -d --name ${containerName} -e CONVERSATION_ID=${conversationId} -v "${workspaceFolder.uri.fsPath}:/app" larry-server`,
        { cwd: workspaceFolder.uri.fsPath }
      );

      const containerId = stdout.trim();
      this.runningContainers.set(conversationId, containerId);

      console.log(
        `Larry container started for conversation ${conversationId}:`,
        containerId
      );
      return containerId;
    } catch (error) {
      console.error('Error starting Larry container:', error);
      throw error;
    }
  }

  private async stopLarryContainer(conversationId: string): Promise<void> {
    try {
      const containerId = this.runningContainers.get(conversationId);
      if (!containerId) {
        console.log(
          `No running container found for conversation ${conversationId}`
        );
        return;
      }

      const containerName = `larry-server-${conversationId}`;

      // Stop and remove container
      await execAsync(`docker stop ${containerName}`);
      await execAsync(`docker rm ${containerName}`);

      this.runningContainers.delete(conversationId);
      console.log(`Larry container stopped for conversation ${conversationId}`);
    } catch (error) {
      console.error('Error stopping Larry container:', error);
      // Don't throw error, just log it
    }
  }

  private transformSessionNameToBranchName(sessionName: string): string {
    return sessionName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .substring(0, 50); // Limit length
  }

  async getCurrentWorktreeId(): Promise<string> {
    try {
      // Get the current workspace folder
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        console.log('No workspace folder found');
        return '';
      }

      console.log(
        'Checking worktree for workspace:',
        workspaceFolder.uri.fsPath
      );

      // Check if we're in a git worktree by looking for .git file (worktree) vs .git directory (main)
      const gitPath = vscode.Uri.joinPath(workspaceFolder.uri, '.git');

      try {
        const gitStat = await vscode.workspace.fs.stat(gitPath);

        if (gitStat.type === vscode.FileType.File) {
          const gitContent = await vscode.workspace.fs.readFile(gitPath);
          const gitDir = gitContent.toString().trim();
          console.log('Git dir content:', gitDir);

          const worktreeMatch = gitDir.match(/worktrees\/([^\/]+)/);
          if (worktreeMatch) {
            return worktreeMatch[1]; // Return the actual worktree name
          } else {
            const worktreeName = gitDir.split('/').pop() || 'unknown';
            return worktreeName;
          }
        } else {
          return await this.getCurrentBranchName(workspaceFolder.uri.fsPath);
        }
      } catch (gitError) {
        // If .git is a directory, we're in the main repository, get current branch
        return await this.getCurrentBranchName(workspaceFolder.uri.fsPath);
      }
    } catch (error) {
      console.error('Error detecting worktree:', error);
      return '';
    }
  }

  async getCurrentBranchName(repoPath: string): Promise<string> {
    try {
      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);

      // Get current branch name
      const { stdout } = await execAsync('git rev-parse --abbrev-ref HEAD', {
        cwd: repoPath,
      });

      const branchName = stdout.trim();
      console.log('Current branch:', branchName);
      return branchName || 'unknown';
    } catch (error) {
      console.error('Error getting current branch:', error);
      return 'unknown';
    }
  }

  async notifyWorktreeChange() {
    if (!this.view) return;

    const worktreeId = await this.getCurrentWorktreeId();
    this.view.webview.postMessage({
      type: 'worktreeChanged',
      worktreeId,
    });
  }

  async createSessionWithWorktree(
    sessionName: string,
    agentId: string,
    conversationId?: string
  ) {
    try {
      // Transform session name to proper branch name format
      const branchName = this.transformSessionNameToBranchName(sessionName);
      const finalWorktreeName = branchName;

      // Get the main repository path - try multiple approaches
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        // Fallback: try to get the active text editor's workspace
        const activeEditor = vscode.window.activeTextEditor;
        console.log('Active editor:', !!activeEditor);
        if (activeEditor) {
          const activeFileUri = activeEditor.document.uri;
          workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
          console.log('Workspace from active file:', !!workspaceFolder);
        }
      }

      if (!workspaceFolder) {
        // Final fallback: ask user to open a folder
        const openFolder = await vscode.window.showErrorMessage(
          'No workspace folder found. Please open a folder first.',
          'Open Folder'
        );
        if (openFolder === 'Open Folder') {
          await vscode.commands.executeCommand('vscode.openFolder');
        }
        return;
      }

      console.log('Using workspace folder:', workspaceFolder.uri.fsPath);

      // Use fixed .larry/worktrees path in the repository
      const worktreesPath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees'
      ).fsPath;

      // Create worktree directory path
      const worktreePath = vscode.Uri.joinPath(
        vscode.Uri.file(worktreesPath),
        finalWorktreeName
      );

      // Create the .larry/worktrees directory if it doesn't exist
      await vscode.workspace.fs.createDirectory(
        vscode.Uri.joinPath(workspaceFolder.uri, '.larry', 'worktrees')
      );

      // Use exec to run git worktree add command and wait for completion
      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);

      try {
        // Create branch name in larry/ format
        const branchName = `larry/${finalWorktreeName}`;
        let worktreeCreated = false;

        try {
          // Get current branch name to branch from
          const { stdout: currentBranch } = await execAsync(
            'git rev-parse --abbrev-ref HEAD',
            { cwd: workspaceFolder.uri.fsPath }
          );
          const sourceBranch = currentBranch.trim();

          console.log(`Creating worktree from current branch: ${sourceBranch}`);

          await execAsync(
            `git worktree add "${worktreePath.fsPath}" -b ${branchName} ${sourceBranch}`,
            { cwd: workspaceFolder.uri.fsPath }
          );
          worktreeCreated = true;
        } catch (branchError: any) {
          // If branch already exists, try to use existing branch
          if (branchError.message?.includes('already exists')) {
            console.log(
              `Branch ${branchName} already exists, trying to use existing branch`
            );
            try {
              await execAsync(
                `git worktree add "${worktreePath.fsPath}" ${branchName}`,
                { cwd: workspaceFolder.uri.fsPath }
              );
              worktreeCreated = true;
            } catch (existingBranchError: any) {
              // If worktree path already exists, show error
              if (
                existingBranchError.message?.includes('already checked out')
              ) {
                throw new Error(
                  `Worktree path already exists: ${worktreePath.fsPath}`
                );
              } else {
                throw existingBranchError;
              }
            }
          } else {
            throw branchError;
          }
        }

        if (worktreeCreated) {
          // Verify the worktree was created
          const worktreeExists = await vscode.workspace.fs
            .stat(worktreePath)
            .then(
              () => true,
              () => false
            );

          if (worktreeExists) {
            // Create initial database record for the session
            if (conversationId) {
              try {
                await this.threadsDao.upsert(
                  JSON.stringify([]), // Start with empty messages
                  'larry-conversation',
                  conversationId,
                  finalWorktreeName,
                  sessionName
                );
              } catch (error) {
                console.error(
                  'Failed to create initial database record:',
                  error
                );
              }
            }

            if (!conversationId) {
              console.error(
                'Conversation ID is missing, critical at this point!'
              );
              return;
            }

            // Notify webview about successful worktree creation
            this.view?.webview.postMessage({
              type: 'worktreeCreated',
              sessionName,
              worktreeName: finalWorktreeName,
              branchName: branchName,
              worktreePath: worktreePath.fsPath,
              agentId,
              conversationId,
            });

            vscode.window.showInformationMessage(
              `Session "${sessionName}" created with worktree: ${finalWorktreeName} (branch: ${branchName})`
            );
          } else {
            vscode.window.showErrorMessage(
              'Worktree was not created successfully'
            );
          }
        }
      } catch (gitError: any) {
        vscode.window.showErrorMessage(
          `Failed to create git worktree: ${gitError.message || gitError}`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to create worktree: ${error}`);
    }
  }

  async openWorktree(worktreeId: string) {
    try {
      // Get the main repository path
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          const activeFileUri = activeEditor.document.uri;
          workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
        }
      }

      if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
      }

      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeId
      ).fsPath;

      // Convert relative path to absolute path
      const absoluteWorktreePath = worktreePath.startsWith('.')
        ? vscode.Uri.joinPath(workspaceFolder.uri, worktreePath).fsPath
        : worktreePath;

      // Check if worktree exists
      const worktreeExists = await vscode.workspace.fs
        .stat(vscode.Uri.file(absoluteWorktreePath))
        .then(
          () => true,
          () => false
        );

      if (!worktreeExists) {
        // Worktree doesn't exist, ask user if they want to create it
        const createWorktree = await vscode.window.showWarningMessage(
          `Worktree doesn't exist at: ${worktreePath}`,
          'Create Worktree',
          'Cancel'
        );

        if (createWorktree === 'Create Worktree') {
          await this.createMissingWorktree(absoluteWorktreePath);
        } else {
          return;
        }
      }

      await vscode.commands.executeCommand(
        'vscode.openFolder',
        vscode.Uri.file(absoluteWorktreePath),
        true
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open worktree: ${error}`);
    }
  }

  async checkWorktreeExists(worktreeId: string): Promise<boolean> {
    try {
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          const activeFileUri = activeEditor.document.uri;
          workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
        }
      }

      if (!workspaceFolder) {
        console.log('checkWorktreeExists: No workspace folder found');
        return false;
      }

      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeId
      ).fsPath;

      // Convert relative path to absolute path
      const absoluteWorktreePath = worktreePath.startsWith('.')
        ? vscode.Uri.joinPath(workspaceFolder.uri, worktreePath).fsPath
        : worktreePath;

      console.log('checkWorktreeExists: Absolute path:', absoluteWorktreePath);

      // Check if worktree exists
      const exists = await vscode.workspace.fs
        .stat(vscode.Uri.file(absoluteWorktreePath))
        .then(
          () => true,
          () => false
        );

      console.log('checkWorktreeExists: Exists:', exists);
      return exists;
    } catch (error) {
      console.error('checkWorktreeExists: Error:', error);
      return false;
    }
  }

  async createMissingWorktree(worktreeId: string) {
    try {
      // Get the main repository path
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          const activeFileUri = activeEditor.document.uri;
          workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
        }
      }

      if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
      }

      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeId
      ).fsPath;

      // Convert relative path to absolute path
      const absoluteWorktreePath = worktreePath.startsWith('.')
        ? vscode.Uri.joinPath(workspaceFolder.uri, worktreePath).fsPath
        : worktreePath;

      // Extract worktree name from path
      const worktreeName = absoluteWorktreePath.split('/').pop() || 'unknown';

      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);

      const branchName = `larry/${worktreeName}`;
      let worktreeCreated = false;

      try {
        // Get current branch name to branch from
        const { stdout: currentBranch } = await execAsync(
          'git rev-parse --abbrev-ref HEAD',
          { cwd: workspaceFolder.uri.fsPath }
        );
        const sourceBranch = currentBranch.trim();

        console.log(
          `Creating missing worktree from current branch: ${sourceBranch}`
        );

        await execAsync(
          `git worktree add "${absoluteWorktreePath}" -b ${branchName} ${sourceBranch}`,
          { cwd: workspaceFolder.uri.fsPath }
        );
        worktreeCreated = true;
      } catch (branchError: any) {
        // If branch already exists, try to use existing branch
        if (branchError.message?.includes('already exists')) {
          try {
            await execAsync(
              `git worktree add "${absoluteWorktreePath}" ${branchName}`,
              { cwd: workspaceFolder.uri.fsPath }
            );
            worktreeCreated = true;
          } catch (existingBranchError: any) {
            // If worktree path already exists, show error
            if (existingBranchError.message?.includes('already checked out')) {
              throw new Error(
                `Worktree path already exists: ${absoluteWorktreePath}`
              );
            } else {
              throw existingBranchError;
            }
          }
        } else {
          throw branchError;
        }
      }

      if (worktreeCreated) {
        vscode.window.showInformationMessage(
          `Worktree created: ${worktreeName} (branch: ${branchName})`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to create worktree: ${error}`);
    }
  }

  async leaveWorktree() {
    try {
      // Get current worktree info
      const currentWorktreeId = await this.getCurrentWorktreeId();

      if (currentWorktreeId === 'main' || !currentWorktreeId) {
        vscode.window.showInformationMessage('Already in main repository');
        return;
      }

      // Find the main repository path - try multiple approaches
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        // Fallback: try to get the active text editor's workspace
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          const activeFileUri = activeEditor.document.uri;
          workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
        }
      }

      if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
      }

      // Just close the current worktree window
      await vscode.commands.executeCommand('workbench.action.closeWindow');

      vscode.window.showInformationMessage('Worktree window closed');
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to leave worktree: ${error}`);
    }
  }

  resolveWebviewView(view: vscode.WebviewView) {
    this.view = view;
    view.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'media'),
      ],
    };

    const scriptUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'webview.js')
    );
    const styleUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'webview.css')
    );
    const overridesUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'overrides.css')
    );
    const nonce = String(Date.now());
    const csp = [
      "default-src 'none'",
      `img-src ${view.webview.cspSource} https: data:`,
      `style-src ${view.webview.cspSource} 'unsafe-inline'`,
      `font-src ${view.webview.cspSource} https:`,
      `script-src 'nonce-${nonce}' ${view.webview.cspSource}`,
    ].join('; ');

    view.webview.html = `<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Security-Policy" content="${csp}">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="${styleUri}">
	<link rel="stylesheet" href="${overridesUri}">
</head>
<body>
	<div id="root"></div>
	<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;

    view.webview.onDidReceiveMessage(async (msg) => {
      if (msg?.type === 'getCurrentWorktree') {
        await this.notifyWorktreeChange();
        return;
      }
      if (msg?.type === 'createSession') {
        await this.createSessionWithWorktree(
          msg.sessionName,
          msg.agentId,
          msg.conversationId
        );
        return;
      }
      if (msg?.type === 'checkWorktreeExists') {
        const exists = await this.checkWorktreeExists(msg.worktreeId);
        view.webview.postMessage({
          type: 'worktreeExists',
          worktreeId: msg.worktreeId,
          exists,
        });
        return;
      }
      if (msg?.type === 'createMissingWorktree') {
        await this.createMissingWorktree(msg.worktreeId);
        return;
      }
      if (msg?.type === 'openWorktree') {
        await this.openWorktree(msg.worktreeId);
        return;
      }
      if (msg?.type === 'leaveWorktree') {
        await this.leaveWorktree();
        return;
      }
      if (msg?.type === 'startLarryServer') {
        try {
          await this.startLarryContainer(msg.conversationId);
          view.webview.postMessage({
            type: 'larryServerStarted',
            conversationId: msg.conversationId,
            success: true,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          console.error('Error starting Larry server:', error);

          // Show user-friendly error message
          vscode.window.showErrorMessage(
            `Failed to start Larry server: ${errorMessage}`
          );

          view.webview.postMessage({
            type: 'larryServerStarted',
            conversationId: msg.conversationId,
            success: false,
            error: errorMessage,
          });
        }
        return;
      }
      if (msg?.type === 'stopLarryServer') {
        try {
          await this.stopLarryContainer(msg.conversationId);
          view.webview.postMessage({
            type: 'larryServerStopped',
            conversationId: msg.conversationId,
            success: true,
          });
        } catch (error) {
          view.webview.postMessage({
            type: 'larryServerStopped',
            conversationId: msg.conversationId,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
        return;
      }
      if (msg?.type === 'loadSessions') {
        await this.loadSessions();
        return;
      }
      if (msg?.type === 'loadMessages') {
        await this.loadMessages(msg.conversationId);
        return;
      }
      if (msg?.type === 'sendMessage') {
        await this.saveMessage(msg.conversationId, msg.message);
        return;
      }
    });
  }
}

export function deactivate() {}
