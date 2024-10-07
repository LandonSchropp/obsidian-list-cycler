import { Setting } from "obsidian";
import { ListCyclerSettingTab } from "settings";
import { GroupSettings as GroupSettingsType, ListCyclerSettings } from "types";

/** The settings for a single group. */
export class GroupSettings {
  settingsTab: ListCyclerSettingTab;
  index: number;

  constructor(settingsTab: ListCyclerSettingTab, index: number) {
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

  mergeGroupSettings(settings: GroupSettingsType | undefined): ListCyclerSettings {
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

  display(): void {
    // Temporary Separator between groups
    this.containerEl.createEl("br");
    this.containerEl.createEl("br");
    this.containerEl.createEl("br");

    new Setting(this.containerEl)
      .setName("Name")
      .setDesc("The name of the group")
      .addText((text) =>
        text
          .setPlaceholder(" x-<>/")
          .setValue(this.settings.name)
          .onChange(async (value) => {
            await this.setSettings({ ...this.settings, name: value });
          }),
      );

    // Delete button
    new Setting(this.containerEl)
      .setName("Delete Group")
      .setDesc("Permanently removes the group")
      .addButton((button) => {
        button
          .setButtonText("Delete")
          .setWarning()
          .onClick(() => this.deleteAndRerender());
      });
  }
}
