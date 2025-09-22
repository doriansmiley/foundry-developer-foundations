import * as vscode from 'vscode';

export async function findProjectRoot(): Promise<string | null> {
  try {
    // First, try to get the workspace folder from VSCode's workspace API
    let workspaceFolder = vscode.workspace.workspaceFolders?.[0];

    // If no workspace folder, try getting it from the active editor
    if (!workspaceFolder) {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        const activeFileUri = activeEditor.document.uri;
        workspaceFolder = vscode.workspace.getWorkspaceFolder(activeFileUri);
      }
    }

    if (!workspaceFolder) {
      console.error('No workspace folder found in VSCode');
      return null;
    }

    return workspaceFolder.uri.fsPath;
  } catch (e) {
    console.error('Error finding foundry project root:', e);
  }

  return null;
}
