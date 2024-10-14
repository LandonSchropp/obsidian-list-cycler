/**
 * The regular expression used to match list items. This will _always_ match a given string,
 * regardless of whether or not it actually contains a list item.
 */
const LIST_ITEM_REGEX = /^(\s*)((?:[-+*]|\d+\.) (?:\[.\] )?|)(.*)$/;
const NUMBER_ITEM_REGEX = /^\d+\./;

/** Represents the position and length of a substring within another string. */
type Segment = [start: number, length: number];

/**
 * @param line The line to check.
 * @returns The start index and the length of the list item. If the line does not have a list item,
 * this function will return the segment where a list item should be inserted.
 */
export function findListItemSegment(line: string): Segment {
  // TODO: Instead of matching a regex, should this compare directly to the list items provided in
  // the settings? This would support additional list item types.
  const [, whitespace, listItem] = line.match(LIST_ITEM_REGEX)!;
  return [whitespace.length, listItem.length];
}

/**
 * Determines if the given text matches the provided list item.
 * @param text The text to check.
 * @param listItem The list item to match against.
 * @returns `true` if the text matches the list item. In order to match, two items must have the
 * same content, including whitespace. Only numbers are allowed to be different.
 */
export function matchesListItem(text: string, listItem: string): boolean {
  return text.replace(NUMBER_ITEM_REGEX, "1.") === listItem.replace(NUMBER_ITEM_REGEX, "1.");
}

/**
 * Finds the list item that should replace the given list item.
 * @param listItem The list item to replace.
 * @param listItems The list items to choose from.
 * @param offset The offset from the current list item to find the replacement.
 * @returns The list item that should replace the given list item. If the list item is not found,
 * this function returns either the first item or last item depending on the offset.
 */
export function findReplacementListItem(
  listItem: string,
  listItems: string[],
  offset: -1 | 1,
): string {
  const index = listItems.findIndex((item) => matchesListItem(item, listItem));

  if (index === -1) {
    return listItems[offset === -1 ? listItems.length - 1 : 0];
  }

  return listItems[(index + offset + listItems.length) % listItems.length];
}

/**
 * @param listItem The list item to check.
 * @returns `true` if the list item is a number list item.
 */
export function isNumberListItem(listItem: string): boolean {
  return NUMBER_ITEM_REGEX.test(listItem);
}
