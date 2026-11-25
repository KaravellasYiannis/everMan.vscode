import { randomUUID } from "node:crypto";
import { readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commands, ExtensionContext, window, workspace } from "vscode";
import { Configuration } from "./interface";
import { renderTheme, variants } from "./theme";

export function activate(context: ExtensionContext) {
  function refresh() {
    const configuration = workspace.getConfiguration().get<Configuration>("everMan");
    if (!configuration) return;

    let changed = false;
    try {
      for (const variant of variants) {
        const path = join(__dirname, "themes", `everman-${variant}.json`);
        const content = renderTheme(configuration, variant);
        if (readFileSync(path, "utf8") === content) continue;

        // VS Code can read the theme while it is being regenerated.
        const temporary = `${path}.${randomUUID()}.tmp`;
        try {
          writeFileSync(temporary, content);
          renameSync(temporary, path);
        } finally {
          rmSync(temporary, { force: true });
        }
        changed = true;
      }
    } catch (error) {
      console.error("everMan could not update its theme files:", error);
      void window.showErrorMessage("everMan could not update its theme files. Check that the extension directory is writable.");
      return;
    }

    if (changed) {
      void window.showInformationMessage("Reload VS Code to apply the everMan settings.", "Reload").then((action) => {
        if (action === "Reload") void commands.executeCommand("workbench.action.reloadWindow");
      });
    }
  }

  context.subscriptions.push(workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("everMan")) refresh();
  }));
  refresh();
}
