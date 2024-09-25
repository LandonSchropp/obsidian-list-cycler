import { cycleListItemBackward, cycleListItemForward } from "list-commands";
import { Plugin } from "obsidian";

interface ListCyclerSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: ListCyclerSettings = {
  mySetting: "default",
};

export default class ListCycler extends Plugin {
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
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
