import { ExtensionContext, window, workspace } from "vscode";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("everMan")) {
      void window.showInformationMessage("everMan settings are available in desktop VS Code only.");
    }
  }));
}
