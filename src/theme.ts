import { Configuration } from "./interface";
import { getPalette } from "./palette";
import { getSemantic } from "./semantic";
import { getSyntax } from "./syntax";
import { getWorkbench } from "./workbench";
import { getDarkChrome } from "./workbench/dark-chrome";
import { getModernColors } from "./workbench/modern";

export const variants = ["dark", "light"] as const;

export function renderTheme(configuration: Configuration, variant: (typeof variants)[number]) {
  const palette = getPalette(configuration, variant);
  const colors = {
    ...getWorkbench(configuration, variant),
    ...(variant === "dark" ? getDarkChrome(palette) : {}),
  };
  return JSON.stringify({
    name: variant === "dark" ? "everMan Dark" : "everMan Light",
    type: variant,
    semanticHighlighting: true,
    semanticTokenColors: getSemantic(configuration, variant),
    colors: { ...getModernColors(colors, palette, configuration.highContrast, variant === "dark"), ...colors },
    tokenColors: getSyntax(configuration, variant),
  }, null, 2) + "\n";
}
