import { cycleCheckboxBackward, cycleCheckboxForward } from "checkbox-commands";
import { cycleListItemBackward, cycleListItemForward } from "list-commands";
import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, ListCyclerSettingTab, ListCyclerSettings } from "settings";

export default class ListCyclerPlugin extends Plugin {
  settings: ListCyclerSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "cycle-list-item-forward",
      name: "Cycle List Item Forward",
      editorCallback: cycleListItemForward,
    });

    this.addCommand({
      id: "cycle-list-item-backward",
      name: "Cycle List Item Backward",
      editorCallback: cycleListItemBackward,
    });

    this.addSettingTab(new ListCyclerSettingTab(this.app, this));
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
