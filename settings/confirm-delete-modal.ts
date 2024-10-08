import { App, ButtonComponent, Modal } from "obsidian";

/** A modal which will confirm whether or not the user wants to delete an item. */
export class ConfirmDeleteModal {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  open(onConfirm: () => void): void {
    // Create modal and its children elements.
    const modal = new Modal(this.app);
    modal.contentEl.style.display = "block";

    // Set the modal's title
    modal.titleEl.setText("Are You Sure?");

    // Create the description
    const description = modal.contentEl.createEl("p", {
      text: "Are you sure you want to delete this item?",
      cls: "setting-item-description",
    });

    description.style.marginBottom = "var(--size-2-2)";

    // Create the actions container.
    const actions = modal.contentEl.createDiv();
    actions.style.display = "flex";
    actions.style.justifyContent = "flex-end";
    actions.style.marginTop = "var(--size-4-4)";
    actions.style.gap = "var(--size-2-2)";

    // Create the cancel button.
    new ButtonComponent(actions).setButtonText("Cancel").onClick(() => {
      modal.close();
    });

    // Create the save button.
    new ButtonComponent(actions)
      .setWarning()
      .setButtonText("Delete")
      .onClick(() => {
        onConfirm();
        modal.close();
      });

    // Open the modal
    modal.open();
  }
}
