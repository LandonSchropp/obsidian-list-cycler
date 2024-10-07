import ListCyclerPlugin from "./main";

import { App, PluginSettingTab, Setting } from "obsidian";

/**
 * The settings for an individual list item inside of a Group. Currently, this is just the text of
 * the list item. This could be expanded to include more information about the list item.
 */
type ListItem = {
  /** The text for the list item. */
  text: string;
};

/**
 * Represents a group of list items to cycle.
 */
type Group = {
  /** The name of the group. */
  name: string;

  /** The list items in the group. */
  listItems: ListItem[];
};

export type ListCyclerSettings = {
  groups: Group[];
};

export const DEFAULT_SETTINGS: ListCyclerSettings = {
  groups: [
    {
      name: "List Type",
      listItems: [
        {
          text: "-",
        },
        {
          text: "1. ",
        },
        {
          text: "- [ ]",
        },
        {
          text: "",
        },
      ],
    },
    {
      name: "Task",
      listItems: [
        {
          text: "- [ ]",
        },
        {
          text: "- [x]",
        },
        {
          text: "- [-]",
        },
        {
          text: "- [/]",
        },
        {
          text: "- [>]",
        },
        {
          text: "- [<]",
        },
      ],
    },
  ],
};

export class ListCyclerSettingTab extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Checkbox characters")
      .setDesc(
        "The checkbox characters to use when cycling through checkboxes. The order of the " +
        "characters determines the order in which they will cycle.",
      )
      .addText((text) =>
        text
          .setPlaceholder(" x-<>/")
          .setValue(this.plugin.settings.checkboxes.join(""))
          .onChange(async (value) => {
            this.plugin.settings.checkboxes = value.split("");
            await this.plugin.saveSettings();
          }),
      );

    new Setting(this.containerEl)
      .setName("Checkbox right click")
      .setDesc("Cycles through the checkboxes when right clicking on them.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.cycleCheckboxRightClick).onChange(async (value) => {
          this.plugin.settings.cycleCheckboxRightClick = value;
          await this.plugin.saveSettings();
        }),
      );
  }
}
