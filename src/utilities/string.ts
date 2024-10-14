/**
 * This is a simplified case conversion function that converts a string from title case to kebab
 * case.
 */
export function kebabCase(string: string): string {
  return string
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(" ", "-");
}
