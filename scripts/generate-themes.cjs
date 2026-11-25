const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { contributes } = require("../package.json");
const { renderTheme, variants } = require("../dist/theme.js");

const defaults = Object.fromEntries(
  Object.entries(contributes.configuration.properties)
    .map(([key, setting]) => [key.slice("everMan.".length), setting.default])
);
const directory = join(__dirname, "../dist/themes");
mkdirSync(directory, { recursive: true });
for (const variant of variants) {
  writeFileSync(join(directory, `everman-${variant}.json`), renderTheme(defaults, variant));
}
