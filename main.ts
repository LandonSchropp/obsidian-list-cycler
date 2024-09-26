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
      icon: "forward",
      editorCallback: cycleListItemForward,
    });

    this.addCommand({
      id: "cycle-list-item-backward",
      name: "Cycle List Item Backward",
      icon: "backward",
      editorCallback: cycleListItemBackward,
    });

    this.addCommand({
      id: "cycle-checkbox-forward",
      name: "Cycle Checkbox Forward",
      icon: "square-arrow-right",
      editorCallback: (editor) => cycleCheckboxForward(editor, this.settings.checkboxes),
    });

    this.addCommand({
      id: "cycle-checkbox-backward",
      name: "Cycle Checkbox Backward",
      icon: "square-arrow-left",
      editorCallback: (editor) => cycleCheckboxBackward(editor, this.settings.checkboxes),
    });

    this.addSettingTab(new ListCyclerSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
