import {
  findListItemSegment,
  findReplacementListItem,
  isNumberListItem,
} from "commands/list-items";
import { Editor } from "obsidian";

/**
 * Starting at the provided line and working backward, this function tries to find the first
 * previous number list item in the editor's document. An item is a match if:
 *
 * - It is a number list item.
 * - It matches the whitespace of the original item.
 *
 * This algorithm will skip over lines indented _further_ than the original line, assuming them to
 * be sub-lists of a previous item. It will also skip over blank lines.
 *
 * @param editor The editor to search.
 * @param whitespace The whitespace of the original item.
 * @param line The line number to start searching from.
 * @returns The value of the list item. If no item is found, this function returns 0, which can then
 * be incremented so the list starts with 1.
 */
function findMatchingNumberListItem(editor: Editor, whitespace: string, line: number): number {
  // Base case: We've reached the end of the document.
  if (line < 0) {
    return 0;
  }

  const currentLine = editor.getLine(line);

  // If the current line is empty, skip it.
  if (currentLine.trim() === "") {
    return findMatchingNumberListItem(editor, whitespace, line - 1);
  }

  // If the current line does not start with the same whitespace, then reject it.
  if (!currentLine.startsWith(whitespace)) {
    return 0;
  }

  // If the current line is indented more than the original line, skip it.
  if (currentLine.slice(whitespace.length).match(/^\s/)) {
    return findMatchingNumberListItem(editor, whitespace, line - 1);
  }

  // If the item is not a number list item, reject it.
  if (!isNumberListItem(currentLine.trim())) {
    return 0;
  }

  // At this point, we've found a match. We can parse the number and return it.
  return Number(currentLine.trim().match(/^\d+/)![0]);
}

// TODO: Expand this to support _multiple_ lines.
function cycleListItem(editor: Editor, listItems: string[], offset: 1 | -1): void {
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const segment = findListItemSegment(line);

  const whitespace = line.slice(0, segment[0]);
  const listItem = line.slice(segment[0], segment[0] + segment[1]);

  let replacementListItem = findReplacementListItem(listItem, listItems, offset);

  // If the replacement is a number, find the next number in the sequence and replace the text.
  if (isNumberListItem(replacementListItem)) {
    const number = findMatchingNumberListItem(editor, whitespace, cursor.line - 1);
    replacementListItem = replacementListItem.replace(/^\d+/, String(number + 1));
  }

  editor.replaceRange(
    replacementListItem,
    { line: cursor.line, ch: segment[0] },
    { line: cursor.line, ch: segment[0] + segment[1] },
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
