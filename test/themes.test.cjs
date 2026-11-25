const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const { test } = require("node:test");
const { contributes } = require("../package.json");
const { getPalette } = require("../dist/palette");
const { renderTheme, variants } = require("../dist/theme");
const { getWorkbench } = require("../dist/workbench");
const { getChrome } = require("../dist/workbench/chrome");

const defaults = Object.fromEntries(Object.entries(contributes.configuration.properties)
  .map(([key, { default: value }]) => [key.slice("everMan.".length), value]));

// The archived b17f8af themes, without the display name or everMan's added colors.
const upstream = {
  dark: "aba0458e407e364c57b8489e6a4db5c6106b99b1f7c328f5b6f4f465b7161279",
  light: "da8edba00b56251aa0552b2fe7c60efcfdf104f0dcea6419e44a12255134ea06",
};

for (const [index, variant] of variants.entries()) {
  test(`${variant}: bundled theme preserves upstream defaults outside workbench surfaces`, () => {
    const contribution = contributes.themes[index];
    const { name, colors, ...theme } = require(`../${contribution.path}`);
    assert.equal(name, contribution.label);
    const legacy = getWorkbench(defaults, variant);
    const chrome = getChrome(getPalette(defaults, variant));
    const legacyColors = Object.fromEntries(Object.keys(legacy)
      .map((key) => [key, key in chrome ? legacy[key] : colors[key]]));
    const { tokenColors, ...metadata } = theme;
    const digest = createHash("sha256")
      .update(JSON.stringify({ ...metadata, colors: legacyColors, tokenColors }))
      .digest("hex");
    assert.equal(digest, upstream[variant]);
  });

  test(`${variant}: modern colors follow the selected palette and workbench`, () => {
    for (const contrast of ["soft", "medium", "hard"]) {
      for (const workbench of ["material", "flat", "high-contrast"]) {
        const options = {
          ...defaults,
          [`${variant}Contrast`]: contrast,
          [`${variant}Workbench`]: workbench,
          [`${variant}Cursor`]: "purple",
          [`${variant}Selection`]: "green",
          highContrast: workbench === "high-contrast",
        };
        const palette = getPalette(options, variant);
        const legacy = {
          ...getWorkbench(options, variant),
          ...getChrome(palette),
        };
        const { colors } = JSON.parse(renderTheme(options, variant));
        const bases = Object.values(palette).map((value) => value.slice(0, 7));
        for (const [key, value] of Object.entries(colors)) {
          if (key in legacy) assert.equal(value, legacy[key], key);
          else {
            assert.match(value, /^#[0-9a-f]{6}([0-9a-f]{2})?$/i, key);
            assert.ok(bases.includes(value.slice(0, 7)), `${key}: ${value} is outside the palette`);
          }
        }
        assert.equal(colors["editorCursor.foreground"], palette.purple);
        assert.equal(colors["terminal.selectionBackground"], colors["editor.selectionBackground"]);
        assert.equal(colors["editorIndentGuide.background1"], colors["editorIndentGuide.background"]);
        assert.equal(colors["surface.background"], colors["sideBar.background"]);
        assert.equal(colors["surface.border"], options.highContrast ? palette.bg5 : palette.bg4);
        assert.equal(colors["agentsChatInput.foreground"], palette.fg);
        assert.equal(colors["editor.background"], palette.bg);
        assert.equal(colors["sideBar.background"], palette.bg1);
        assert.equal(colors["panel.background"], palette.bg1);
        assert.equal(colors["terminal.background"], palette.bg1);
        assert.equal(colors["editorGroupHeader.tabsBackground"], palette.bg0);
        assert.equal(colors["modernUI.shellBackground"], palette.bg0);
        assert.equal(colors["modernEditorTab.activeBackground"], variant === "dark" ? palette.bg4 : palette.bg);
        assert.equal(colors["modernEditorTab.activeHoverBackground"], variant === "dark" ? palette.bg5 : palette.bg);
      }
    }
  });
}
