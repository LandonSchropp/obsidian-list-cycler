import { ListItemSettingsView } from "settings/list-item-settings-view";
import { Setting } from "obsidian";
import { SettingsView } from "settings/settings-view";
import { ListItemSettings } from "types";
import { splice } from "utilities";

const EMPTY_LIST_ITEM = {
  text: "",
};

/** The settings for a single group. */
export class GroupSettingsView {
  settingsView: SettingsView;
  index: number;

  constructor(settingsView: SettingsView, index: number) {
    this.settingsView = settingsView;
    this.index = index;
  }

  get app() {
    return this.settingsView.app;
  }

  get plugin() {
    return this.settingsView.plugin;
  }

  get containerEl() {
    return this.settingsView.containerEl;
  }

  get settings() {
    return this.plugin.settings.groups[this.index];
  }

  rerender() {
    this.settingsView.rerender();
  }

  async setName(name: string): Promise<void> {
    await this.settingsView.spliceGroups(this.index, 1, [
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
    listItems: ListItemSettings[],
  ): Promise<void> {
    this.settingsView.spliceGroups(this.index, 1, [
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
    this.settingsView.spliceGroups(this.index, 1, []);
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
      new ListItemSettingsView(this, index).display();
    }

    // Add List Item
    new Setting(this.containerEl).addButton((button) => {
      button.setButtonText("Add List Item").onClick(() => this.addListItem());
    });
  }
}
