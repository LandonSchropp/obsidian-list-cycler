import ListCyclerPlugin from "./main";

import { App, PluginSettingTab, Setting } from "obsidian";

export class ListCyclerSettingTab extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Checkboxes")
      .setDesc("The checkbox characters to use when cycling through checkboxes.")
      .addText((text) =>
        text
          .setPlaceholder(" x-<>/")
          .setValue(this.plugin.settings.checkboxes)
          .onChange(async (value) => {
            this.plugin.settings.checkboxes = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
