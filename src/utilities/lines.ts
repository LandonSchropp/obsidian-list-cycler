/**
 * @param line The line to check.
 * @param whitespace The whitespace to compare against.
 * @returns Whether the line starts with the same whitespace as the provided whitespace string.
 */
export function hasSameWhitespace(line: string, whitespace: string): boolean {
  return line.startsWith(whitespace) && !/^\s/.test(line.slice(whitespace.length));
}
