import { cycleListItemBackward, cycleListItemForward } from "list-commands";
import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, SettingsView } from "settings/settings-view";
import { Settings } from "./types";
import { kebabCase } from "utilities/string";
import { sanitizeListItem } from "settings/sanitize";

export default class ListCyclerPlugin extends Plugin {
  settings: Settings;

  async onload() {
    await this.loadSettings();

    this.settings.groups.forEach((group) => {
      const nameId = kebabCase(group.name);
      const listItems = group.listItems.map((item) => sanitizeListItem(item.text));

      this.addCommand({
        id: `cycle-${nameId}-forward`,
        name: `Cycle ${group.name} Forward`,
        icon: "forward",
        editorCallback: (editor) => cycleListItemForward(editor, listItems),
      });

      this.addCommand({
        id: `cycle-${nameId}-backward`,
        name: `Cycle ${group.name} Backward`,
        icon: "backward",
        editorCallback: (editor) => cycleListItemBackward(editor, listItems),
      });
    });

    this.addSettingTab(new SettingsView(this.app, this));
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
