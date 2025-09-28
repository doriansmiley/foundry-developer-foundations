import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { findProjectRoot } from './findProjectRoot';
import path from 'path';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
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
  private runningContainers: Map<string, string> = new Map(); // threadId -> containerId
  private mainDockerContainer: string | undefined; // Main docker container for port 4210

  constructor(private readonly context: vscode.ExtensionContext) {
    // No initialization needed for new flow
  }

  // Thread ID file management
  private async readCurrentThreadId(
    worktreeName: string
  ): Promise<string | undefined> {
    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        return undefined;
      }

      const threadIdFilePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeName,
        'tmp',
        'currentThreadId.txt'
      );

      const fileContent = await vscode.workspace.fs.readFile(threadIdFilePath);
      return fileContent.toString().trim();
    } catch (error) {
      // File doesn't exist or can't be read
      return undefined;
    }
  }

  private async writeCurrentThreadId(
    worktreeName: string,
    threadId: string
  ): Promise<void> {
    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        return;
      }

      const tmpDir = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeName,
        'tmp'
      );

      // Create tmp directory if it doesn't exist
      await vscode.workspace.fs.createDirectory(tmpDir);

      const threadIdFilePath = vscode.Uri.joinPath(
        tmpDir,
        'currentThreadId.txt'
      );
      await vscode.workspace.fs.writeFile(
        threadIdFilePath,
        Buffer.from(threadId, 'utf8')
      );
    } catch (error) {
      console.error('Error writing thread ID file:', error);
    }
  }

  // Main Docker management methods
  private async ensureMainDockerRunning(): Promise<void> {
    try {
      // Check if main docker is already running
      if (this.mainDockerContainer) {
        try {
          await execAsync(`docker inspect ${this.mainDockerContainer}`);
          console.log(
            'Main docker container already running:',
            this.mainDockerContainer
          );
          return;
        } catch (error) {
          // Container doesn't exist, clear the reference
          this.mainDockerContainer = undefined;
        }
      }

      // Start main docker container
      await this.startMainDockerContainer();
    } catch (error) {
      console.error('Error ensuring main docker is running:', error);
    }
  }

  private async startMainDockerContainer(): Promise<void> {
    try {
      const foundryProjectRoot = await findProjectRoot();
      if (!foundryProjectRoot) {
        throw new Error('Project root not found.');
      }

      const containerName = 'larry-main-server';

      // Clean up existing container if any
      try {
        await execAsync(`docker rm -f ${containerName}`);
        console.log(`Cleaned up existing main container: ${containerName}`);
      } catch (cleanupError) {
        // Container doesn't exist, which is fine
      }

      // Start main container on port 4210
      const { stdout } = await execAsync(
        `docker run -d --name ${containerName} \
   -p 4210:4210 \
   -v "${foundryProjectRoot}:/workspace:ro" \
   --user 1001:1001 \
   larry-server`
      );

      const containerId = stdout.trim();
      this.mainDockerContainer = containerId;

      console.log('Main Larry container started:', containerId);
    } catch (error) {
      console.error('Error starting main Larry container:', error);
      throw error;
    }
  }

  private async stopMainDockerContainer(): Promise<void> {
    try {
      if (!this.mainDockerContainer) {
        return;
      }

      const containerName = 'larry-main-server';

      // Stop and remove container
      await execAsync(`docker stop ${containerName}`);
      await execAsync(`docker rm ${containerName}`);

      this.mainDockerContainer = undefined;
      console.log('Main Larry container stopped');
    } catch (error) {
      console.error('Error stopping main Larry container:', error);
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
        'Larry.Dockerfile'
      );
      const dockerfileExists = await vscode.workspace.fs
        .stat(dockerfilePath)
        .then(
          () => true,
          () => false
        );

      if (!dockerfileExists) {
        throw new Error(
          `Larry.Dockerfile not found at ${dockerfilePath.fsPath}`
        );
      }

      await execAsync(`docker build -f Larry.Dockerfile -t larry-server .`, {
        cwd: foundryProjectRoot,
      });
    } catch (error) {
      console.error('Error building Docker image:', error);
      throw error;
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
    const isInWorktree = await this.isInWorktree();
    let currentThreadId: string | undefined;

    // If in worktree, try to read thread ID from file
    if (isInWorktree && worktreeId) {
      try {
        currentThreadId = await this.readCurrentThreadId(worktreeId);
      } catch (error) {
        console.error('Error reading thread ID for worktree:', error);
      }
    }

    this.view.webview.postMessage({
      type: 'worktree_detection',
      isInWorktree,
      currentThreadId,
    });

    // Start main docker if not in worktree
    if (!isInWorktree) {
      await this.ensureMainDockerRunning();
    }
  }

  async isInWorktree(): Promise<boolean> {
    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        return false;
      }

      // Check if we're in a git worktree by looking for .git file (worktree) vs .git directory (main)
      const gitPath = vscode.Uri.joinPath(workspaceFolder.uri, '.git');

      try {
        const gitStat = await vscode.workspace.fs.stat(gitPath);

        if (gitStat.type === vscode.FileType.File) {
          const gitContent = await vscode.workspace.fs.readFile(gitPath);
          const gitDir = gitContent.toString().trim();

          // If .git is a file pointing to a worktree, we're in a worktree
          return gitDir.includes('worktrees/');
        } else {
          // If .git is a directory, we're in the main repository
          return false;
        }
      } catch (gitError) {
        // If .git doesn't exist or can't be read, assume not in worktree
        return false;
      }
    } catch (error) {
      console.error('Error detecting worktree:', error);
      return false;
    }
  }

  async handleOpenWorktree(
    worktreeName: string,
    threadId: string | undefined,
    label: string
  ) {
    try {
      // Create or ensure worktree exists
      const finalWorktreeName = await this.createOrEnsureWorktree(
        worktreeName,
        threadId,
        label
      );

      if (!finalWorktreeName) {
        throw new Error('Failed to create or find worktree');
      }

      // Setup worktree environment
      await this.setupWorktreeEnvironment(finalWorktreeName, threadId);

      // Start worktree docker container
      await this.startWorktreeDockerContainer(finalWorktreeName, threadId);

      // Notify that worktree is ready
      this.view?.webview.postMessage({
        type: 'worktree_ready',
        worktreeName: finalWorktreeName,
        threadId,
      });

      // Open worktree in new window
      await this.openWorktree(finalWorktreeName);
    } catch (error) {
      console.error('Error handling open worktree:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      // Show VSCode toast notification
      vscode.window.showErrorMessage(
        `Failed to setup worktree: ${errorMessage}`
      );

      this.view?.webview.postMessage({
        type: 'worktree_setup_error',
        error: errorMessage,
        worktreeName,
        threadId,
      });
    }
  }

  async createOrEnsureWorktree(
    worktreeName: string,
    threadId: string | undefined,
    label: string
  ): Promise<string | undefined> {
    try {
      // Get workspace folder
      let workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          workspaceFolder = vscode.workspace.getWorkspaceFolder(
            activeEditor.document.uri
          );
        }
      }

      if (!workspaceFolder) {
        throw new Error('No workspace folder found');
      }

      // Generate final worktree name if not provided
      let finalWorktreeName = worktreeName;
      if (!finalWorktreeName || finalWorktreeName.trim() === '') {
        finalWorktreeName =
          this.transformSessionNameToBranchName(label) +
          '-' +
          Math.random().toString(36).substring(2, 5);
      }

      // Check if worktree already exists
      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        finalWorktreeName
      );

      const worktreeExists = await vscode.workspace.fs.stat(worktreePath).then(
        () => true,
        () => false
      );

      if (!worktreeExists) {
        // Create worktree
        await this.createWorktreeInternal(
          workspaceFolder,
          finalWorktreeName,
          threadId,
          label
        );
      }

      return finalWorktreeName;
    } catch (error) {
      console.error('Error creating or ensuring worktree:', error);
      throw error;
    }
  }

  async createWorktreeInternal(
    workspaceFolder: vscode.WorkspaceFolder,
    worktreeName: string,
    threadId: string | undefined,
    label: string
  ) {
    try {
      // Create worktree directory path
      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeName
      );

      // Create the .larry/worktrees directory if it doesn't exist
      await vscode.workspace.fs.createDirectory(
        vscode.Uri.joinPath(workspaceFolder.uri, '.larry', 'worktrees')
      );

      // Create branch name in larry/ format
      const branchName = `larry/${worktreeName}`;
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
            if (existingBranchError.message?.includes('already checked out')) {
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
        // Write thread ID to file only if provided (existing worktree case)
        if (threadId && threadId.trim() !== '') {
          try {
            await this.writeCurrentThreadId(worktreeName, threadId);
            console.log(
              `Worktree created: ${worktreeName} (branch: ${branchName}) with thread ID: ${threadId}`
            );
          } catch (error) {
            console.error('Failed to write thread ID file:', error);
          }
        } else {
          // New worktree - no thread ID file created yet
          console.log(
            `New worktree created: ${worktreeName} (branch: ${branchName}) - thread ID will be assigned later`
          );
        }
      }
    } catch (error) {
      console.error('Error creating worktree:', error);
      throw error;
    }
  }

  async setupWorktreeEnvironment(worktreeName: string, threadId?: string) {
    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        throw new Error('No workspace folder found');
      }

      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeName
      ).fsPath;

      // Run npm install in worktree
      console.log('Running npm install in worktree...');
      await execAsync('npm install', { cwd: worktreePath });

      // Set environment variables (if needed)
      // This could be extended to set specific env vars for the worktree

      console.log('Worktree environment setup completed');
    } catch (error) {
      console.error('Error setting up worktree environment:', error);
      throw error;
    }
  }

  async startWorktreeDockerContainer(
    worktreeName: string,
    threadId: string | undefined
  ): Promise<string> {
    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        throw new Error('No workspace folder found');
      }

      const containerName = `larry-worktree-${worktreeName}`;

      // Clean up existing container if any
      try {
        await execAsync(`docker rm -f ${containerName}`);
        console.log(`Cleaned up existing worktree container: ${containerName}`);
      } catch (cleanupError) {
        // Container doesn't exist, which is fine
      }

      const worktreePath = vscode.Uri.joinPath(
        workspaceFolder.uri,
        '.larry',
        'worktrees',
        worktreeName
      ).fsPath;

      // Start worktree container on port 3000
      const threadIdEnv = threadId ? `-e THREAD_ID=${threadId}` : '';
      const { stdout } = await execAsync(
        `docker run -d --name ${containerName} \
   -p 3000:3000 \
   ${threadIdEnv} \
   -e WORKTREE_NAME=${worktreeName} \
   -v "${worktreePath}:/workspace:rw" \
   --user 1001:1001 \
   larry-server`
      );

      const containerId = stdout.trim();
      // Use worktree name as key since threadId might be undefined
      this.runningContainers.set(worktreeName, containerId);

      console.log(
        `Worktree Larry container started for ${worktreeName}:`,
        containerId
      );
      return containerId;
    } catch (error) {
      console.error('Error starting worktree Larry container:', error);
      throw error;
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
          vscode.window.showInformationMessage(
            'Please use the "Open worktree" flow in the extension to create worktrees.'
          );
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
      `connect-src ${view.webview.cspSource} http://localhost:3000 http://localhost:4210`,
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
      // New flow message handlers
      if (msg?.type === 'open_worktree') {
        await this.handleOpenWorktree(
          msg.worktreeName || '',
          msg.threadId || undefined,
          msg.label
        );
        return;
      }

      // Keep only essential legacy handlers for basic functionality
      if (msg?.type === 'getCurrentWorktree') {
        await this.notifyWorktreeChange();
        return;
      }
    });
  }
}

export function deactivate() {
  // Cleanup main docker container if running
  // Note: This is a best-effort cleanup, errors are ignored
  try {
    const { exec } = require('child_process');
    exec('docker rm -f larry-main-server', () => {
      // Ignore errors during cleanup
    });
  } catch (error) {
    // Ignore cleanup errors
  }
}
