import { findListItemPosition, findReplacementListItem } from "commands/list-items";
import { Editor } from "obsidian";

// TODO: Expand this to support _multiple_ lines.
// TODO: Support proper replacement of numbers.
function cycleListItem(editor: Editor, listItems: string[], offset: 1 | -1): void {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const position = findListItemPosition(line);
  const listItem = line.slice(position[0], position[0] + position[1]);

  const replacementListItem = findReplacementListItem(listItem, listItems, offset);

  editor.replaceRange(
    replacementListItem,
    { line: cursor.line, ch: position[0] },
    { line: cursor.line, ch: position[0] + position[1] },
  );
}

/**
 * Swaps the list item on the current line with the previous type of list item. If the line does not
 * have an item in the provided list, then the last item will be used.
 *
 * @param editor The editor to operate on.
 * @param listItems The list items to choose from.
 */
export function cycleListItemBackward(editor: Editor, listItems: string[]): void {
  cycleListItem(editor, listItems, -1);
}

/**
 * Swaps the list item on the current line with the next type of list item. If the line does not
 * have an item in the provided list, then the first item will be used.
 *
 * @param editor The editor to operate on.
 * @param listItems The list items to choose from.
 */
export function cycleListItemForward(editor: Editor, listItems: string[]): void {
  cycleListItem(editor, listItems, 1);
}
