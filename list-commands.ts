import { extractListItem, getListItemType, ListItemType, replacementListItem } from "list-items";
import { Editor } from "obsidian";

const NEXT_STATE = {
  none: "bullet",
  bullet: "number",
  number: "checkbox",
  checkbox: "none",
} as const;

const PREVIOUS_STATE = {
  none: "checkbox",
  bullet: "none",
  number: "bullet",
  checkbox: "number",
} as const;

function cycleListItem(editor: Editor, transformType: (type: ListItemType) => ListItemType): void {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const referenceLine = cursor.line === 0 ? line : editor.getLine(cursor.line - 1);

  const whitespace = line.match(/^\s*/)![0];
  const listItem = extractListItem(line);
  const referenceItem = extractListItem(referenceLine);

  const type = getListItemType(listItem);
  const replacementType = transformType(type);

  editor.replaceRange(
    replacementListItem(replacementType, referenceItem),
    { line: cursor.line, ch: whitespace.length },
    { line: cursor.line, ch: whitespace.length + listItem.length },
  );
}

/**
 * Swaps the list item on the current line with the previous type of list item. If the current line
 * does not have a list item, one a checkbox list item will be inserted.
 *
 * @param editor The editor to operate on.
 */
export function cycleListItemBackward(editor: Editor): void {
  cycleListItem(editor, (type) => PREVIOUS_STATE[type]);
}

/**
 * Swaps the list item on the current line with the next type of list item. If the current line does
 * not have a list item, one a bullet list item will be inserted.
 *
 * @param editor The editor to operate on.
 */
export function cycleListItemForward(editor: Editor): void {
  cycleListItem(editor, (type) => NEXT_STATE[type]);
}
