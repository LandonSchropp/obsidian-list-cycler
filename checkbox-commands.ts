import { replacementCheckbox } from "checkboxes";
import { extractListItem, getListItemType } from "list-items";
import { Editor } from "obsidian";

function cycleCheckbox(editor: Editor, checkboxes: string[], offset: number): void {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);

  const whitespace = line.match(/^\s*/)![0];
  const listItem = extractListItem(line);
  const type = getListItemType(listItem);

  if (type !== "checkbox") {
    return;
  }

  editor.replaceRange(
    replacementCheckbox(listItem, checkboxes, offset),
    { line: cursor.line, ch: whitespace.length },
    { line: cursor.line, ch: whitespace.length + listItem.length },
  );
}

/**
 * Swaps the checkbox mark on the current line with the previous checkbox mark. If the current line
 * does not have a checkbox, this command does nothing.
 *
 * @param editor The editor to operate on.
 * @param checkboxes The possible checkbox marks to cycle through.
 */
export function cycleCheckboxBackward(editor: Editor, checkboxes: string[]): void {
  cycleCheckbox(editor, checkboxes, -1);
}

/**
 * Swaps the checkbox mark on the current line with the next checkbox mark. If the current line does
 * not have a checkbox, this command does nothing.
 *
 * @param editor The editor to operate on.
 * @param checkboxes The possible checkbox marks to cycle through.
 */
export function cycleCheckboxForward(editor: Editor, checkboxes: string[]): void {
  cycleCheckbox(editor, checkboxes, 1);
}
