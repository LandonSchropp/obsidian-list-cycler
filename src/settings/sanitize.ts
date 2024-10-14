/**
 * Sanitize a list item, ensuring that the formatting and whitespace are correct.
 * @param listItem The text to sanitize.
 * @returns The sanitized list item.
 */
export function sanitizeListItem(listItem: string): string {
  listItem = listItem.trim();
  return listItem === "" ? listItem : `${listItem} `;
}
