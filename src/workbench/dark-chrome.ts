import { Palette } from "../interface";

export function getDarkChrome({ bg0, bg1 }: Palette) {
  return {
    "sideBar.background": bg1,
    "panel.background": bg1,
    "terminal.background": bg1,
    "tab.inactiveBackground": bg1,
    "activityBar.background": bg0,
    "activityBar.border": bg0,
    "editorGroupHeader.tabsBackground": bg0,
    "editorGroupHeader.noTabsBackground": bg0,
    "titleBar.activeBackground": bg0,
    "titleBar.inactiveBackground": bg0,
    "titleBar.border": bg0,
    "statusBar.background": bg0,
    "statusBar.border": bg0,
    "statusBar.noFolderBackground": bg0,
    "statusBar.noFolderBorder": bg0,
  };
}
