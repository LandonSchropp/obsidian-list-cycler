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

  mergeListItemSettings(settings: ListItemSettingsType | undefined): GroupSettingsType {
    return {
      ...this.groupSettings.settings,
      listItems: [
        ...this.groupSettings.settings.listItems.slice(0, this.index),
        settings,
        ...this.groupSettings.settings.listItems.slice(this.index + 1),
      ].filter((group) => group !== undefined),
    };
  }

  async setSettings(settings: ListItemSettingsType): Promise<void> {
    await this.groupSettings.setSettings(this.mergeListItemSettings(settings));
  }

  async setSettingsAndRerender(settings: ListItemSettingsType): Promise<void> {
    await this.groupSettings.setSettingsAndRerender(this.mergeListItemSettings(settings));
  }

  async deleteAndRerender() {
    await this.groupSettings.setSettingsAndRerender(this.mergeListItemSettings(undefined));
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
          .onChange((value) => this.setSettings({ ...this.settings, text: value }));

        text.inputEl.style.marginRight = "auto";
      })
      .addExtraButton((button) => {
        this.styleExtraButton(button, "arrow-up", this.isFirstListItem, () => {});
      })
      .addExtraButton((button) => {
        this.styleExtraButton(button, "arrow-down", this.isLastListItem, () => {});
      })
      .addExtraButton((button) => {
        button
          .setIcon("trash")
          .setDisabled(this.isOnlyListItem)
          .onClick(() => this.deleteAndRerender());
      });

    // Remove the name and description, since it's not necessary for list items.
    setting.infoEl.remove();
  }
}
