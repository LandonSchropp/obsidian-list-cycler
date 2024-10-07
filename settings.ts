import { GroupSettings } from "group-settings";
import ListCyclerPlugin from "./main";

import { App, PluginSettingTab, Setting } from "obsidian";
import { ListCyclerSettings } from "types";

/** The default settings for List Cycler. */
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

/** An empty group to clone when adding a new group. */
const EMPTY_GROUP = {
  name: "",
  listItems: [
    {
      text: "",
    },
  ],
};

/** The settings tab for List Cycler. */
export class ListCyclerSettingTab extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  get settings(): ListCyclerSettings {
    return this.plugin.settings;
  }

  async setSettings(settings: ListCyclerSettings): Promise<void> {
    this.plugin.settings = settings;
    await this.plugin.saveSettings();
  }

  async setSettingsAndRerender(settings: ListCyclerSettings): Promise<void> {
    await this.setSettings(settings);
    this.display();
  }

  display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Add Group")
      .setDesc("Creates a new group of list items to cycle through.")
      .addButton((button) => {
        button.setButtonText("Add Group");
        button.onClick(async () => {
          await this.setSettingsAndRerender({
            ...this.settings,
            groups: [...this.settings.groups, structuredClone(EMPTY_GROUP)],
          });
        });
      });

    for (let index = 0; index < this.settings.groups.length; index++) {
      new GroupSettings(this, index).display();
    }
  }
}
