import { ListItemSettings } from "list-item-settings";
import { Setting } from "obsidian";
import { Settings } from "settings";
import {
  GroupSettings as GroupSettingsType,
  Settings as SettingsType,
  ListItemSettings as ListItemSettingsType,
} from "types";
import { splice } from "utilities";

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

  rerender() {
    this.settingsTab.rerender();
  }

  async setName(name: string): Promise<void> {
    await this.settingsTab.spliceGroups(this.index, 1, [
      {
        ...this.settings,
        name,
      },
    ]);

    this.rerender();
  }

  async spliceListItems(
    index: number,
    deleteCount: number,
    listItems: ListItemSettingsType[],
  ): Promise<void> {
    this.settingsTab.spliceGroups(this.index, 1, [
      {
        ...this.settings,
        listItems: splice(this.settings.listItems, index, deleteCount, listItems),
      },
    ]);
  }

  async addListItem() {
    this.spliceListItems(this.settings.listItems.length, 0, [structuredClone(EMPTY_LIST_ITEM)]);
    this.rerender();
  }

  async delete() {
    this.settingsTab.spliceGroups(this.index, 1, []);
    this.rerender();
  }

  display(): void {
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
          .onClick(() => this.delete());
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
