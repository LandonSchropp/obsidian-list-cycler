import { cycleListItemBackward, cycleListItemForward } from "commands/commands";
import { Plugin } from "obsidian";
import { SettingsView } from "settings/settings-view";
import { GroupSettings, Settings } from "./types";
import { kebabCase } from "utilities/string";
import { sanitizeListItem } from "settings/sanitize";
import { DEFAULT_SETTINGS } from "settings/constants";

export default class ListCyclerPlugin extends Plugin {
  settings: Settings;

  async onload() {
    await this.loadSettings();

    for (const [index, group] of this.settings.groups.entries()) {
      this.addCommands(group, index);
    }

    this.addSettingTab(new SettingsView(this.app, this));
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  addCommands(group: GroupSettings, index: number) {
    this.addCommand({
      id: this.generateCommandId(group.name, "forward"),
      name: `Cycle ${group.name} Forward`,
      icon: "forward",
      editorCallback: (editor) => {
        // NOTE: The list items must be loaded dynamically in the callback. Otherwise, the plugin
        // will not respond immediately to changes in the settings.
        cycleListItemForward(editor, this.groupListItems(index));
      },
    });

    this.addCommand({
      id: this.generateCommandId(group.name, "backward"),
      name: `Cycle ${group.name} Backward`,
      icon: "backward",
      editorCallback: (editor) => {
        // NOTE: The list items must be loaded dynamically in the callback. Otherwise, the plugin
        // will not respond immediately to changes in the settings.
        cycleListItemBackward(editor, this.groupListItems(index));
      },
    });
  }

  removeCommands(group: GroupSettings) {
    // The `removeCommand` method is only supported on the very latest version of Obsidian. As
    // such, we can't remove the commands unless it's present.
    if (this.removeCommand) {
      this.removeCommand(this.generateCommandId(group.name, "forward"));
      this.removeCommand(this.generateCommandId(group.name, "backward"));
    }
  }

  private generateCommandId(name: string, direction: "forward" | "backward"): string {
    return `cycle-${kebabCase(name)}-${direction}`;
  }

  private groupListItems(index: number): string[] {
    return this.settings.groups[index].listItems.map((item) => sanitizeListItem(item.text));
  }
}
