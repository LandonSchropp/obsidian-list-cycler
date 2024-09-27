# Obsidian List Cycler

This is a simple plugin for cycling between different types of lists and checkboxes in Obsidian.
It's made to be extra simple—the plugin provides a few commands that you can map to hotkeys.

In order to view the alternative checkboxes in this plugin, you'll want to use a theme that displays
them such as [Minimal](https://minimal.guide/) or
[Things](https://github.com/colineckert/obsidian-things).

## How It Works

This plugin works at two levels: list items and checkboxes.

### List Items

List Cycler cycles between four different list states for a line:

- None
- Bullet
- Number
- Checkbox

To use it, simply place your cursor on the line containing the checkbox and then run either the
`Cycle List Item Forward` or `Cycle List Item Backward` command.

### Checkboxes

List Cycler can also cycle between checkbox states. By default, it uses the following checkboxes:

- `[ ]`: To-do
- `[x]`: Done
- `[-]`: Cancelled
- `[>]`: Forwarded
- `[<]`: Scheduled
- `[/]`: Incomplete

However, you can configure whatever checkboxes you'd like in the plugin's settings. For ideas on
some options you could include, check out [Minimal's
documentation](https://github.com/kepano/obsidian-minimal?tab=readme-ov-file#alternate-checkboxes).

## How to Use

List Cycler ships with a few commands for manipulating lists. These are unbound by default, and you
can bind them to whatever hotkeys you'd like.

| Name                     | Recommended Hotkey                                                      |
| ------------------------ | ----------------------------------------------------------------------- |
| Cycle List Item Forward  | <kbd>Command</kbd>/<kbd>Control</kbd> + <kbd>L</kbd>                    |
| Cycle List Item Backward | <kbd>Command</kbd>/<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> |
| Cycle Checkbox Forward   | <kbd>Command</kbd>/<kbd>Control</kbd> + <kbd>M</kbd>                    |
| Cycle Checkbox Forward   | <kbd>Command</kbd>/<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> |

In addition, List Cycler can be configured via the plugin settings page.

## Similar Plugins

This plugin is meant to provide one specific way of interacting with lists. If that's not for you,
you might try some of these other plugins:

- [Task Collector](https://github.com/ebullient/obsidian-task-collector): A plugin for managing task
  lists in Obsidian, including a modal for selecting between different types of checkboxes.
- [Task Marker](https://github.com/wenlzhang/obsidian-task-marker): Cycle between different task
  states and optionally append dates to tasks via hotkeys or context menus.
