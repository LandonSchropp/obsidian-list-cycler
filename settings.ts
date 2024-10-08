import { GroupSettings } from "group-settings";
import ListCyclerPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { Settings as SettingsType, GroupSettings as GroupSettingsType } from "types";
import { splice } from "utilities";

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

  set settings(settings: SettingsType) {
    this.plugin.settings = settings;
  }

  async save(): Promise<void> {
    await this.plugin.saveSettings();
  }

  async spliceGroups(
    index: number,
    deleteCount: number,
    groups: GroupSettingsType[],
  ): Promise<void> {
    this.settings = {
      ...this.settings,
      groups: splice(this.settings.groups, index, deleteCount, groups),
    };

    await this.save();
  }

  rerender() {
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
          await this.spliceGroups(this.settings.groups.length, 0, [structuredClone(EMPTY_GROUP)]);
          this.rerender();
        });
      });

    // Add a little extra space after the last group
    newGroupSetting.settingEl.style.marginTop = "3em";
  }
}
