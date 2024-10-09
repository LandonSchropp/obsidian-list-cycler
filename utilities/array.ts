/**
 * An immutable version of the `Array.splice` method.
 * @param array The array to splice.
 * @param start The index at which to start changing the array.
 * @param deleteCount The number of elements in the array to remove.
 * @items The elements to add to the array.
 * @returns A new array with the specified elements removed and added.
 */
export function splice<T>(array: T[], start: number, deleteCount: number, items: T[]): T[] {
  return [...array.slice(0, start), ...items, ...array.slice(start + deleteCount)];
}
