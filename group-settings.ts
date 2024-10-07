import { ListItemSettings } from "list-item-settings";
import { Setting } from "obsidian";
import { Settings } from "settings";
import { GroupSettings as GroupSettingsType, Settings as SettingsType } from "types";

const EMPTY_LIST_ITEM = {
  text: "",
};

/** The settings for a single group. */
export class GroupSettings {
  settingsTab: Settings;
  index: number;

  constructor(settingsTab: Settings, index: number) {
    this.settingsTab = settingsTab;
    this.index = index;
  }

  get app() {
    return this.settingsTab.app;
  }

  get plugin() {
    return this.settingsTab.plugin;
  }

  get containerEl() {
    return this.settingsTab.containerEl;
  }

  get settings() {
    return this.plugin.settings.groups[this.index];
  }

  mergeGroupSettings(settings: GroupSettingsType | undefined): SettingsType {
    return {
      ...this.settingsTab.settings,
      groups: [
        ...this.settingsTab.settings.groups.slice(0, this.index),
        settings,
        ...this.settingsTab.settings.groups.slice(this.index + 1),
      ].filter((group) => group !== undefined),
    };
  }

  async setSettings(settings: GroupSettingsType): Promise<void> {
    await this.settingsTab.setSettings(this.mergeGroupSettings(settings));
  }

  async setSettingsAndRerender(settings: GroupSettingsType): Promise<void> {
    await this.settingsTab.setSettingsAndRerender(this.mergeGroupSettings(settings));
  }

  async deleteAndRerender() {
    await this.settingsTab.setSettingsAndRerender(this.mergeGroupSettings(undefined));
  }

  async addListItem() {
    await this.setSettingsAndRerender({
      ...this.settings,
      listItems: [...this.settings.listItems, structuredClone(EMPTY_LIST_ITEM)],
    });
  }

  display(): void {
    // Name
    const nameSetting = new Setting(this.containerEl)
      .setHeading()
      .setName(this.settings.name)
      .addButton((button) => {
        button.setButtonText("Rename").onClick(() => {});
      })
      .addButton((button) => {
        button
          .setButtonText("Delete")
          .setWarning()
          .onClick(() => this.deleteAndRerender());
      });

    nameSetting.settingEl.style.marginTop = "3em";
    nameSetting.nameEl.style.fontSize = "var(--h4-size)";

    // List items
    for (let index = 0; index < this.settings.listItems.length; index++) {
      new ListItemSettings(this, index).display();
    }

    // Add List Item
    new Setting(this.containerEl).addButton((button) => {
      button.setButtonText("Add List Item").onClick(() => this.addListItem());
    });
  }
}
