import { ListItemSettingsView } from "settings/list-item-settings-view";
import { Setting } from "obsidian";
import { SettingsView } from "settings/settings-view";
import { GroupSettings, ListItemSettings } from "types";
import { splice } from "utilities/array";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { EditGroupNameModal } from "./edit-group-name-modal";
import { EMPTY_LIST_ITEM } from "./constants";

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
    const currentGroupSettings: GroupSettings = structuredClone(this.settings);

    await this.settingsView.spliceGroups(this.index, 1, [
      {
        ...this.settings,
        name,
      },
    ]);

    this.rerender();

    this.plugin.removeCommands(currentGroupSettings);
    this.plugin.addCommands(this.settings, this.index);
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

    this.plugin.removeCommands(this.settings);
  }

  openEditNameModal() {
    new EditGroupNameModal(this.app, this.settings.name, false).open((name) => this.setName(name));
  }

  openConfirmDeleteModal() {
    new ConfirmDeleteModal(this.app).open(() => this.delete());
  }

  display(): void {
    const nameSetting = new Setting(this.containerEl)
      .setHeading()
      .setName(this.settings.name)
      .addButton((button) => {
        button.setButtonText("Rename").onClick(() => this.openEditNameModal());
      })
      .addButton((button) => {
        button
          .setButtonText("Delete")
          .setWarning()
          .onClick(() => this.openConfirmDeleteModal());
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
