# everMan

An Everforest-based theme for VS Code 1.109 and later, with dark and light variants. **everMan Dark** keeps the original Everforest editor background and uses darker shades for the sidebar, panels, and window frame.

![everMan Dark in VS Code](docs/everman-dark.png)

## Install on Windows

You only need VS Code and a prebuilt `.vsix` file. No Node.js, npm, or terminal required.

1. Save the `everman-0.1.0.vsix` file you received. The source ZIP is not an installable extension.
2. In VS Code, press **Ctrl+Shift+P** and run **Extensions: Install from VSIX...**
3. Select `everman-0.1.0.vsix`.
4. Run **Preferences: Color Theme** and choose **everMan Dark** or **everMan Light**.

## Build a VSIX from source

If you only have the source, build the VSIX with Node.js 22 or later: run `npm ci`, then `npm run package`. Share the resulting `.vsix` file with anyone who wants to install the theme.

## Customize

Search for `@ext:karavellas.everman` in VS Code's **User** settings. If you're migrating from Everforest, rename `everforest.*` settings to `everMan.*`. Choose **Reload** when prompted.

Based on [Everforest for VS Code](https://github.com/sainnhe/everforest-vscode), commit `b17f8af`, by Sainnhe Park. MIT licensed.
