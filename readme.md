# List Cycler

List Cycler is a plugin that lets you quickly cycle between different kinds of lists. It works by
letting you define different groups of list items, and then it adds commands to move forward and
backward between each type of the list item.

## Examples

### List Types

One of the simplest applications of List Cycler is cycling between major types of lists: bullet,
number, and none. List Cycler includes this group by default, so you can try it by running the `List
Cycler: Cycle List Type Forward` and `List Cycler: Cycle List Type Backward` commands.

![List Type Example](/assets/list-type-example.gif)

<details>

<summary>Settings</summary>

![List Type Settings](/assets/list-type-settings.png)

</details>

### Tasks

If you're using an Obsidian theme that supports alternative checkboxes, such as
[Minimal](https://minimal.guide/checklists) or
[Things](https://github.com/colineckert/obsidian-things?tab=readme-ov-file#checkbox-styling), then
you can cycle between these with ease. Here's an example that switches between different types of
tasks: to-do, in-progress, done, forward, schedule and cancel.

![Task Example](/assets/task-example.gif)

<details>

<summary>Settings</summary>

![Task Settings](/assets/task-settings.png)

</details>

### Pros/Cons

You could also use alternative checkboxes to quickly create a shortcut for creating pros/cons lists.

![Pros/Cons Example](/assets/pro-con-example.gif)

<details>

<summary>Settings</summary>

![Pros/Cons Settings](/assets/pro-con-settings.png)

</details>

### Symbols

Finally, you might create a new group for cycling between alternate checkbox symbols, such as the
star, warning, idea, question and info icons.

![Symbol Example](/assets/symbol-example.gif)

<details>

<summary>Settings</summary>

![Symbol Settings](/assets/symbol-settings.png)

</details>

The possibilities are endless, and List Cycler can be configured to create whatever list types you’d
like!

## Special Features

### Smart Numbering

List Cycler automatically matches the number scheming of your lists when cycling to numbered lists.

### Multiline Support

List Cycler works over multiple lines! Simply select the lines that you'd like to cycle, and then
run your command.

The plugin will automatically skip lines that do not match the first line's indentation, allowing
you to easily avoid nested line and blank lines.

## Configuration

### Groups

List Cycler is centered around the idea of _groups_ of list items. Each cycle is its own group.

To configure a new set of list items to cycle, click the `Add Group` button. You can then add as
many new items as you want to the list using the `Add List Item` button. Your list must always
contain at least one item. The order of the items determines the order List Cycler will use.

For the most part, the values will be matched exactly. However, there are two special types of values you can add:

- **Empty values:** If you enter an empty value, this will be treated as none. When you cycle to
  this value, the list item will be removed from the line.
- **Numbers:** If your list item begins with a number followed by a period (e.g. `1.`), then List
  Cycler will set the number to the value after the previous item in the list.

Numbers are handled specially. If your list contains a number, it will automatically be replaced
with the _next_ number in a list. This works even for list items that have children. This will not
replace numbers in tasks lists.

### Hotkeys

Every time you create a new group, two commands are added to Obsidian:

- `List Cycler: Cycle <Group> Forward`
- `List Cycler: Cycle <Group> Forward`

In the Obsidian Settings, you can navigate to the **Hotkeys** section and assign these commands
whatever keyboard shortcuts you like.

No hotkeys are configured by default, so if you want to use List Cycler, you'll have to assign them
to _something_. Below are a couple of suggestions for the default groups, but you can use whatever
you want.

- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>L</kbd>: Cycle List Type Forward
- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>: Cycle List Type Backward
- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>M</kbd>: Cycle Task Forward
- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>: Cycle Task Backward

## Other Commands

For convenience, List Cycler includes a few other commands for working with lists. These aren't part
of the cycling functionality, but they're still useful.

- `List Cycler: Select Task`: This command selects the character _inside_ of the current line's task
  list. This makes it it really easy to quickly change the current task list item's type _without_
  needing to cycle through it. (TODO)
- `List Cycler: Remove List`: Converts the current line or the selected lines into a task list.
- `List Cycler: Convert to Task List`: Converts the current line or the selected lines into a task
  list.
- `List Cycler: Convert to Bullet List`: Converts the current line or the selected lines into a
  bullet list.
- `List Cycler: Convert to Number List`: Converts the current line or the selected lines into a
  number list.

## Similar Plugins

This plugin works great with the [Outliner](https://github.com/vslinko/obsidian-outliner) plugin,
which provides other useful list shortcuts, such as tabbing to indent lists.

This plugin is meant to provide one specific way of interacting with lists. If that's not for you,
no problem—you might try some of these other plugins:

- [Task Collector](https://github.com/ebullient/obsidian-task-collector): A plugin for managing task
  lists in Obsidian, including a modal for selecting between different types of checkboxes.
- [Task Marker](https://github.com/wenlzhang/obsidian-task-marker): Cycle between different task
  states and optionally append dates to tasks via hotkeys or context menus.
