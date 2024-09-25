/** The four possible types of lists in markdown. */
export type ListItemType = "none" | "bullet" | "number" | "checkbox";

const DEFAULT_BULLET = "- ";

const BULLET_ITEM_REGEX = /^([-*]) /;
const NUMBER_ITEM_REGEX = /^(\d+)\. /;
const CHECKBOX_ITEM_REGEX = /^([-*]) \[( |\S)\] /;

/**
 * @param listItem The item to check.
 * @returns The type of the list item.
 */
export function getListItemType(listItem: string): ListItemType {
  if (CHECKBOX_ITEM_REGEX.test(listItem)) {
    return "checkbox";
  }

  if (BULLET_ITEM_REGEX.test(listItem)) {
    return "bullet";
  }

  if (NUMBER_ITEM_REGEX.test(listItem)) {
    return "number";
  }

  return "none";
}

/**
 * @param referenceItem The list item whose style will be matched.
 * @returns A replacement bullet list item.
 */
function replacementBullet(referenceItem: string): string {
  const match = referenceItem.match(BULLET_ITEM_REGEX);
  return match ? `${match[1]} ` : DEFAULT_BULLET;
}

/**
 * @param referenceItem The list item whose style will be matched.
 * @returns A replacement checkbox list item.
 */
function replacementCheckbox(referenceItem: string): string {
  return `${replacementBullet(referenceItem)}[ ] `;
}

/**
 * @param referenceItem The list item whose style will be matched.
 * @returns A replacement number list item.
 */
function replacementNumber(referenceItem: string): string {
  const number = Number(referenceItem.match(NUMBER_ITEM_REGEX)?.[1] ?? "0");
  return `${number + 1}. `;
}

/**
 * @param type The type of list item to create.
 * @param referenceItem The list item on the previous line whose style will be matched.
 * @returns A replacement list item.
 */
export function replacementListItem(type: ListItemType, referenceItem: string): string {
  switch (type) {
    case "bullet":
      return replacementBullet(referenceItem);
    case "number":
      return replacementNumber(referenceItem);
    case "checkbox":
      return replacementCheckbox(referenceItem);
    default:
      return "";
  }
}

/**
 * @param line The line to extract the list item from.
 * @returns The list item without any leading whitespace or content.
 */
export function extractListItem(line: string): string {
  line = line.trim();

  const match =
    line.match(CHECKBOX_ITEM_REGEX) ??
    line.match(NUMBER_ITEM_REGEX) ??
    line.match(BULLET_ITEM_REGEX);

  return match?.[0] ?? "";
}

/**
 * @param listItem The list item to extract the checkbox character from.
 * @returns The character in the checkbox list item, or undefined if the list item is not a
 * checkbox.
 */
export function extractCheckboxCharacter(listItem: string): string | undefined {
  return listItem.match(CHECKBOX_ITEM_REGEX)?.[2];
}
