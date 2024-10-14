import { GroupSettings, ListItemSettings, Settings } from "types";

/** An empty list item. */
export const EMPTY_LIST_ITEM: ListItemSettings = {
  text: "",
};

/** A bullet list item. */
export const BULLET_LIST_ITEM: ListItemSettings = {
  text: "-",
};

/** A number list item. */
export const NUMBER_LIST_ITEM: ListItemSettings = {
  text: "1.",
};

/** A task list item. */
export const TASK_LIST_ITEM: ListItemSettings = {
  text: "- [ ]",
};

/** An empty group to clone when adding a new group. */
export const EMPTY_GROUP: GroupSettings = {
  name: "",
  listItems: [EMPTY_LIST_ITEM],
};

/** The default settings for List Cycler. */
export const DEFAULT_SETTINGS: Settings = {
  groups: [
    {
      name: "List Type",
      listItems: [BULLET_LIST_ITEM, NUMBER_LIST_ITEM, TASK_LIST_ITEM, EMPTY_LIST_ITEM],
    },
    {
      name: "Task",
      listItems: [
        TASK_LIST_ITEM,
        {
          text: "- [ ]",
        },
        {
          text: "- [x]",
        },
        {
          text: "- [-]",
        },
        {
          text: "- [/]",
        },
        {
          text: "- [>]",
        },
        {
          text: "- [<]",
        },
      ],
    },
  ],
};
