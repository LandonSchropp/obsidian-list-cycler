import ListCyclerPlugin from "./main";

import { App, PluginSettingTab, Setting } from "obsidian";

export interface ListCyclerSettings {
  checkboxes: string[];
  cycleCheckboxRightClick: boolean;
}

export const DEFAULT_SETTINGS: ListCyclerSettings = {
  checkboxes: [" ", "x", "-", "<", ">", "/"],
  cycleCheckboxRightClick: true,
};

export class ListCyclerSettingTab extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Checkbox characters")
      .setDesc(
        "The checkbox characters to use when cycling through checkboxes. The order of the " +
        "characters determines the order in which they will cycle.",
      )
      .addText((text) =>
        text
          .setPlaceholder(" x-<>/")
          .setValue(this.plugin.settings.checkboxes.join(""))
          .onChange(async (value) => {
            this.plugin.settings.checkboxes = value.split("");
            await this.plugin.saveSettings();
          }),
      );

    new Setting(this.containerEl)
      .setName("Checkbox right click")
      .setDesc("Cycles through the checkboxes when right clicking on them.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.cycleCheckboxRightClick).onChange(async (value) => {
          this.plugin.settings.cycleCheckboxRightClick = value;
          await this.plugin.saveSettings();
        }),
      );
  }
}
