import { ExtraButtonComponent, Setting } from "obsidian";
import { GroupSettingsView } from "settings/group-settings-view";

/** The settings for a single group. */
export class ListItemSettingsView {
  groupSettingsView: GroupSettingsView;
  index: number;

  constructor(groupSettingsView: GroupSettingsView, index: number) {
    this.groupSettingsView = groupSettingsView;
    this.index = index;
  }

  get app() {
    return this.groupSettingsView.app;
  }

  get plugin() {
    return this.groupSettingsView.plugin;
  }

  get containerEl() {
    return this.groupSettingsView.containerEl;
  }

  get settings() {
    return this.groupSettingsView.settings.listItems[this.index];
  }

  get isFirstListItem() {
    return this.index === 0;
  }

  get isLastListItem() {
    return this.index === this.groupSettingsView.settings.listItems.length - 1;
  }

  get isOnlyListItem() {
    return this.groupSettingsView.settings.listItems.length <= 1;
  }

  rerender() {
    this.groupSettingsView.rerender();
  }

  async setText(text: string): Promise<void> {
    await this.groupSettingsView.spliceListItems(this.index, 1, [
      {
        ...this.settings,
        text,
      },
    ]);
  }

  async moveUp() {
    await this.groupSettingsView.spliceListItems(this.index - 1, 2, [
      this.groupSettingsView.settings.listItems[this.index],
      this.groupSettingsView.settings.listItems[this.index - 1],
    ]);

    this.rerender();
  }

  async moveDown() {
    await this.groupSettingsView.spliceListItems(this.index, 2, [
      this.groupSettingsView.settings.listItems[this.index + 1],
      this.groupSettingsView.settings.listItems[this.index],
    ]);

    this.rerender();
  }

  async delete() {
    await this.groupSettingsView.spliceListItems(this.index, 1, []);
    this.rerender();
  }

  private customizeExtraButton(
    button: ExtraButtonComponent,
    icon: string,
    tooltip: string,
    disabled: boolean,
    callback: () => void,
  ): void {
    button.setIcon(icon).setDisabled(disabled).setTooltip(tooltip).onClick(callback);
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
        this.customizeExtraButton(button, "arrow-up", "Move Up", this.isFirstListItem, () => {});
        button.onClick(() => this.moveUp());
      })
      .addExtraButton((button) => {
        this.customizeExtraButton(button, "arrow-down", "Move Down", this.isLastListItem, () => {});
        button.onClick(() => this.moveDown());
      })
      .addExtraButton((button) => {
        this.customizeExtraButton(button, "trash", "Delete", this.isOnlyListItem, () =>
          this.delete(),
        );
      });

    // Remove the name and description, since it's not necessary for list items.
    setting.infoEl.remove();
  }
}
