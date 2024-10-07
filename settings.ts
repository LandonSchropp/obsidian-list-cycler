import { GroupSettings } from "group-settings";
import ListCyclerPlugin from "./main";

import { App, PluginSettingTab, Setting } from "obsidian";
import { Settings as SettingsType } from "types";

/** The default settings for List Cycler. */
export const DEFAULT_SETTINGS: SettingsType = {
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
export class Settings extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  get settings(): SettingsType {
    return this.plugin.settings;
  }

  async setSettings(settings: SettingsType): Promise<void> {
    this.plugin.settings = settings;
    await this.plugin.saveSettings();
  }

  async setSettingsAndRerender(settings: SettingsType): Promise<void> {
    await this.setSettings(settings);
    this.display();
  }

  display(): void {
    this.containerEl.empty();

    const titleSetting = new Setting(this.containerEl)
      .setHeading()
      .setName("List Cycler")
      .setDesc(
        "Configure the groups and list items to cycle through. For each group, List Cycler " +
          "will generate commands for you to cycle through the list items.",
      );

    titleSetting.nameEl.style.fontSize = "var(--h2-size)";

    for (let index = 0; index < this.settings.groups.length; index++) {
      new GroupSettings(this, index).display();
    }

    const newGroupSetting = new Setting(this.containerEl)
      .setHeading()
      .setName("Add a New Group")
      .setDesc("Add a group to cycle through")
      .addButton((button) => {
        button.setButtonText("Add Group").onClick(async () => {
          await this.setSettingsAndRerender({
            ...this.settings,
            groups: [...this.settings.groups, structuredClone(EMPTY_GROUP)],
          });
        });

        if (this.settings.groups.length === 0) {
          button.setCta();
        }
      });

    // Add a little extra space after the last group
    newGroupSetting.settingEl.style.marginTop = "3em";
  }
}
