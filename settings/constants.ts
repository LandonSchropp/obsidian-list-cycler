import { GroupSettings, ListItemSettings } from "types";

/** An empty group devoid of any content. */
export const EMPTY_LIST_ITEM: ListItemSettings = {
  text: "",
};

/** An empty group to clone when adding a new group. */
export const EMPTY_GROUP: GroupSettings = {
  name: "",
  listItems: [EMPTY_LIST_ITEM],
};
