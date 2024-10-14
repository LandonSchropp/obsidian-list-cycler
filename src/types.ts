/**
 * The settings for an individual list item inside of a Group. Currently, this is just the text of
 * the list item. This could be expanded to include more information about the list item.
 */
export type ListItemSettings = {
  /** The text for the list item. */
  text: string;
};

/**
 * The settings for a group of list items to cycle.
 */
export type GroupSettings = {
  /** The name of the group. */
  name: string;

  /** The list items in the group. */
  listItems: ListItemSettings[];
};

/** The settings for List Cycler. */
export type Settings = {
  /** The groups to cycle through. */
  groups: GroupSettings[];
};
