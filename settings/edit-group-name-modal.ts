import { App, ButtonComponent, Modal, TextComponent } from "obsidian";

/** A modal which allows the user to edit the group name. */
export class EditGroupNameModal {
  app: App;
  name: string;
  isNew: boolean;

  constructor(app: App, name: string, isNew: boolean) {
    this.app = app;
    this.name = name;
    this.isNew = isNew;
  }

  get hasName() {
    return this.name.trim() !== "";
  }

  updateSaveButton(button: ButtonComponent): void {
    button.setDisabled(!this.hasName);

    if (this.hasName) {
      button.setCta();
    } else {
      button.removeCta();
    }

    button.buttonEl.style.cursor = this.hasName ? "pointer" : "not-allowed";
    button.buttonEl.style.opacity = this.hasName ? "100%" : "50%";
    button.buttonEl.style.pointerEvents = this.hasName ? "auto" : "none";
  }

  open(onSave: (text: string) => void): void {
    // Create modal and its children elements.
    const modal = new Modal(this.app);
    modal.contentEl.style.display = "block";

    // Set the modal's title
    modal.titleEl.setText(this.isNew ? "Create a Group" : "Rename Group");

    // Create the input
    const inputContainer = modal.contentEl.createDiv();

    inputContainer.style.marginTop = "var(--size-4-4)";
    inputContainer.style.marginBottom = "var(--size-4-8)";

    const label = inputContainer.createEl("label", {
      text: "Name",
      cls: "setting-item-name",
    });

    label.style.display = "block";
    label.style.marginBottom = "var(--size-4-2)";

    const input = new TextComponent(inputContainer).setValue(this.name).onChange((value) => {
      this.name = value;
      this.updateSaveButton(saveButton);
    });

    input.inputEl.style.display = "block";
    input.inputEl.style.width = "100%";

    // Create the actions container
    const actions = modal.contentEl.createDiv();
    actions.style.display = "flex";
    actions.style.justifyContent = "flex-end";
    actions.style.marginTop = "var(--size-4-4)";
    actions.style.gap = "var(--size-4-4)";

    // Create the cancel button
    new ButtonComponent(actions).setButtonText("Cancel").onClick(() => {
      modal.close();
    });

    // Create the save button
    const saveButton = new ButtonComponent(actions).setButtonText("Save").onClick(() => {
      onSave(this.name);
      modal.close();
    });

    this.updateSaveButton(saveButton);

    // Open the modal
    modal.open();
  }
}
