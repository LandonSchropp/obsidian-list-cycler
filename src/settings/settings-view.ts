import { GroupSettingsView } from "settings/group-settings-view";
import ListCyclerPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { Settings, GroupSettings } from "types";
import { splice } from "utilities/array";
import { EditGroupNameModal } from "./edit-group-name-modal";
import { EMPTY_GROUP } from "./constants";

/** The settings view for List Cycler. */
export class SettingsView extends PluginSettingTab {
  plugin: ListCyclerPlugin;

  constructor(app: App, plugin: ListCyclerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  get settings(): Settings {
    return this.plugin.settings;
  }

  set settings(settings: Settings) {
    this.plugin.settings = settings;
  }

  async save(): Promise<void> {
    await this.plugin.saveSettings();
  }

  async spliceGroups(index: number, deleteCount: number, groups: GroupSettings[]): Promise<void> {
    this.settings = {
      ...this.settings,
      groups: splice(this.settings.groups, index, deleteCount, groups),
    };

    await this.save();
  }

  rerender() {
    this.display();
  }

  openCreateGroupModal() {
    new EditGroupNameModal(this.app, "", true).open((name) => this.createGroup(name));
  }

  async createGroup(name: string) {
    const group = { ...structuredClone(EMPTY_GROUP), name };
    const index = this.settings.groups.length;

    await this.spliceGroups(index, 0, [group]);
    this.rerender();

    this.plugin.addCommands(group, index);
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
      new GroupSettingsView(this, index).display();
    }

    const newGroupSetting = new Setting(this.containerEl)
      .setHeading()
      .setName("Add a New Group")
      .setDesc("Add a group to cycle through")
      .addButton((button) => {
        button.setButtonText("Add Group").onClick(() => this.openCreateGroupModal());
      });

    // Add a little extra space after the last group
    newGroupSetting.settingEl.style.marginTop = "3em";
  }
}
