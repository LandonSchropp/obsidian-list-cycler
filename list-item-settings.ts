import { ExtraButtonComponent, Setting } from "obsidian";
import { GroupSettings } from "./group-settings";
import {
  ListItemSettings as ListItemSettingsType,
  GroupSettings as GroupSettingsType,
} from "./types";

/** The settings for a single group. */
export class ListItemSettings {
  groupSettings: GroupSettings;
  index: number;

  constructor(groupSettings: GroupSettings, index: number) {
    this.groupSettings = groupSettings;
    this.index = index;
  }

  get app() {
    return this.groupSettings.app;
  }

  get plugin() {
    return this.groupSettings.plugin;
  }

  get containerEl() {
    return this.groupSettings.containerEl;
  }

  get settings() {
    return this.groupSettings.settings.listItems[this.index];
  }

  get isFirstListItem() {
    return this.index === 0;
  }

  get isLastListItem() {
    return this.index === this.groupSettings.settings.listItems.length - 1;
  }

  get isOnlyListItem() {
    return this.groupSettings.settings.listItems.length <= 1;
  }

  rerender() {
    this.groupSettings.rerender();
  }

  async setText(text: string): Promise<void> {
    await this.groupSettings.spliceListItems(this.index, 1, [
      {
        ...this.settings,
        text,
      },
    ]);
  }

  async moveUp() {
    await this.groupSettings.spliceListItems(this.index - 1, 2, [
      this.groupSettings.settings.listItems[this.index],
      this.groupSettings.settings.listItems[this.index - 1],
    ]);

    this.rerender();
  }

  async moveDown() {
    await this.groupSettings.spliceListItems(this.index, 2, [
      this.groupSettings.settings.listItems[this.index + 1],
      this.groupSettings.settings.listItems[this.index],
    ]);

    this.rerender();
  }

  async delete() {
    await this.groupSettings.spliceListItems(this.index, 1, []);
    this.rerender();
  }

  private styleExtraButton(
    button: ExtraButtonComponent,
    icon: string,
    disabled: boolean,
    callback: () => void,
  ): void {
    button.setIcon(icon).setDisabled(disabled).onClick(callback);
    button.extraSettingsEl.style.cursor = disabled ? "not-allowed" : "pointer";
    button.extraSettingsEl.style.opacity = disabled ? "50%" : "100%";
    button.extraSettingsEl.style.pointerEvents = disabled ? "none" : "auto";
  }

  display(): void {
    const setting = new Setting(this.containerEl)
      .addText((text) => {
        text
          .setPlaceholder("List Item")
          .setValue(this.settings.text)
          .onChange((value) => this.setText(value));

        text.inputEl.style.marginRight = "auto";
      })
      .addExtraButton((button) => {
        this.styleExtraButton(button, "arrow-up", this.isFirstListItem, () => {});
        button.onClick(() => this.moveUp());
      })
      .addExtraButton((button) => {
        this.styleExtraButton(button, "arrow-down", this.isLastListItem, () => {});
        button.onClick(() => this.moveDown());
      })
      .addExtraButton((button) => {
        this.styleExtraButton(button, "trash", this.isOnlyListItem, () => this.delete());
      });

    // Remove the name and description, since it's not necessary for list items.
    setting.infoEl.remove();
  }
}
