import { findListItemSegment } from "commands/list-items";
import { Editor, EditorPosition } from "obsidian";

type Line = {
  line: string;
  whitespace: string;
  listItem: string;
};

export function getLine(editor: Editor): Line {
  const cursorFrom = editor.getCursor("from");

  const line = editor.getLine(cursorFrom.line);
  const segment = findListItemSegment(line);
  const whitespace = line.slice(0, segment[0]);
  const listItem = line.slice(segment[0], segment[0] + segment[1]);

  return { line, whitespace, listItem };
}

type Cursor = {
  isSelection: boolean;
  from: EditorPosition;
  to: EditorPosition;
};

export function getCursor(editor: Editor): Cursor {
  const selection = editor.getSelection();
  const cursorFrom = editor.getCursor("from");
  const cursorTo = editor.getCursor("to");

  return {
    isSelection: selection.length > 0,
    from: cursorFrom,
    to: cursorTo,
  };
}

/**
 * Moves the cursor to the end of the list item contained in the current line, but only under a few
 * circumstances:
 *
 * - No text may be selected.
 * - The cursor must be before or within the list item.
 *
 * @param editor The editor to operate on.
 */
export function moveCursorToEndOfLineItem(editor: Editor): void {
  const cursor = getCursor(editor);

  // Don't do anything if there is a selection.
  if (cursor.isSelection) {
    return;
  }

  const { whitespace, listItem } = getLine(editor);

  // If the cursor is after the list item, don't do anything.
  if (cursor.from.ch > whitespace.length + listItem.length) {
    return;
  }

  // Move the cursor to the end of the list item.
  editor.setCursor({ line: cursor.from.line, ch: whitespace.length + listItem.length });
}
