import { extractCheckboxCharacter } from "list-items";

const CHECKBOX_REPLACEMENT_REGEX = /(^[-*] \[)( |\S)(\] )/;

function offsetCheckboxCharacter(
  listItem: string,
  checkboxes: string[],
  offset: number,
): string | undefined {
  const currentCharacter = extractCheckboxCharacter(listItem);

  if (currentCharacter === undefined) {
    return;
  }

  const index = checkboxes.indexOf(currentCharacter);

  if (index === -1) {
    return;
  }

  return checkboxes[(index + offset + checkboxes.length) % checkboxes.length];
}

/**
 * @param listItem The list item to replace the checkbox character in.
 * @param checkboxes The possible checkbox characters to cycle through.
 * @param offset The offset to apply to the current checkbox character.
 * @returns The replacement checkbox list item.
 */
export function replacementCheckbox(
  listItem: string,
  checkboxes: string[],
  offset: number,
): string {
  const replacementCharacter = offsetCheckboxCharacter(listItem, checkboxes, offset);

  if (replacementCharacter === undefined) {
    return listItem;
  }

  // NOTE: Previously, I used a lookbehind and lookahead in the regex to avoid the need to capture
  // multiple parts of the string. However, this feature is not supported in an older iOS version
  // that Obsidian must be compatible with.
  const match = listItem.match(CHECKBOX_REPLACEMENT_REGEX);
  return `${match![1]}${replacementCharacter}${match![3]}`;
}
