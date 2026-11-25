# everMan

An Everforest-based color theme for Visual Studio Code 1.109 and later. **everMan Dark** and **everMan Light** keep the original Everforest palette, TextMate rules, semantic highlighting, and workbench styles. Newer VS Code versions also get matching colors for the modern layout, sticky scroll, diffs and merge conflicts, source control history, test coverage, and Chat, inline edits, and Agents.

**everMan Dark** keeps the original editor background, with darker sidebars and panels and an even darker window frame. Modern editor tabs use a stronger active fill; select `pill` for `workbench.experimental.modernUIEditorTabStyle` if you prefer rounded tabs.

![everMan Dark in VS Code, showing the active pill tab, Explorer sidebar, TypeScript highlighting, and integrated terminal](docs/everman-dark.png)

## Install from source

With Node.js 22 or newer, run:

```sh
npm ci
npm run package
code --install-extension everman-0.1.0.vsix
```

Run **Preferences: Color Theme** and select **everMan Dark** or **everMan Light**. For development, press **F5** to build and open an Extension Development Host, or run `npm test` to check the generated themes.

## Install from source on Windows

1. Install VS Code 1.109 or newer and Node.js 22 or newer. If you downloaded the source as a ZIP, extract it first.
2. In VS Code, choose **File → Open Folder** and select the source folder that contains `package.json`.
3. Open **Terminal → New Terminal** and run these commands in PowerShell:

   ```powershell
   npm.cmd ci
   npm.cmd run package
   ```

4. Press **Ctrl+Shift+P**, run **Extensions: Install from VSIX...**, and select `everman-0.1.0.vsix` in the source folder.
5. Run **Preferences: Color Theme** and select **everMan Dark** or **everMan Light**.

## Customize

Search for `@ext:karavellas.everman` in VS Code's **User** settings. Each variant offers soft, medium, and hard contrast; material, flat, and high-contrast workbench styles; and cursor and selection colors. Both variants share the italic keyword and comment settings, diagnostic background opacity, and the extra high-contrast border switch.

If you're switching from the archived extension, rename your `everforest.*` user settings to `everMan.*` (for example, `everforest.darkContrast` becomes `everMan.darkContrast`). Then choose **Reload** when prompted. Desktop customization needs a writable extension directory. VS Code for the Web can use the bundled defaults or VS Code's built-in theme-specific color and token overrides.

Based on [Everforest for VS Code](https://github.com/sainnhe/everforest-vscode), commit `b17f8af`, by Sainnhe Park. MIT licensed.
