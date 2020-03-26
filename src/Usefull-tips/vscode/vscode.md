# Vscode usefull tip

## Code-snippet
To create or edit your own snippets, select User Snippets under **File > Preferences** (Code > Preferences on macOS), and then select the language (by language identifier) for which the snippets should appear, or the New Global Snippets file option if they should appear for all languages. VS Code manages the creation and refreshing of the underlying snippets file(s) for you.

![img](~@pic/img/snippet-dropdown.png)

```json
{
  // Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
  // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
  // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
  // used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
  // Placeholders with the same ids are connected.
  // Example:
  // "Print to console": {
  // "scope": "javascript,typescript",
  // "prefix": "log",
  // "body": [
  // "console.log('$1');",
  // "$2"
  // ],
  // "description": "Log output to console"
  // }
  "Print to console": {
    "scope": "javascript,typescript",
    "prefix": "cl",
    "body": [
    "console.log(':::$1', $1$2);",
    ],
    "description": "Log output to console"
  },
  "Print object in pre": {
    "prefix": "pr",
    "body": [
    "<pre style=‘color:gray’>$1: {{ $1 }}</pre>",
    ],
    "description": "print obj to pre"
  },
}
```
## Usefull extensions

### Front-end

- Auto Close Tag
- ESLint
- JSON Editor
- Remove Console Logs
- Vetur
- Vue Peek
- JavaScript(ES6) code snippets