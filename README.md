## Overview

This extension provide these features.

- highlight
- hover
- completion

You can use these CMS' tags and modifiers.

- Movable Type
- Movable Type.net
- PowerCMS
- PowerCMS X

## Features

Works with `*.mtml` files

### Syntax Highlight

Highlight in `Dark+(default dark)` vscode theme

![highlightImage.png](./images/highlightImage.png "highlightImage.png")

#### tmLanguage Naming Conventions

| element        | scope name                   |
| :------------- | :--------------------------- |
| mt tag         | entity.other.inherited-class |
| mt control tag | keyword.control              |
| modifier       | constant.numeric             |
| ignore         | comment.block                |
| quoted string  | string.quoted                |

### Hover

Display the tag description when the cursor hovers over the tag.

If you want to disable this feature, Set `mtml.hover.enable:false` in `.vscode/settings.json`.

![hover item for tag](./images/hovarImage_onTag.png)

Show tag description and global modifier description when the cursor hovers over a global modifier.

![hover item for global modifier](./images/hoverImage_onGlobalModifier.png)

### Completion

Outside the tag, the tag is given as a completion candidate.

If you want to disable this feature, Set `mtml.completion.enable:false` in `.vscode/settings.json`.

![completion item for tag](./images/completionImage_tag.png)

Inside the tag, tag modifiers and global modifiers are given as completion candidates.

![completion item for global modifier](./images/completionImage_globalModifier.png)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `mtml.hover.enable`: hover feature
  - true: enable
  - false: disable
- `mtml.completion.enable`: completion feature
  - true: enable
  - false: disable
- `mtml.cms.type`: What is your cms? Select after.
  - `Movable Type` default
  - `Movable Type.net`
  - `PowerCMS`
  - `PowerCMS X`

## Super Thanks

- Syntax Highlighting - [yupyom/vscode-movabletype](https://github.com/yupyom/vscode-movabletype/tree/0.1.0)
- Snippets - [hei-a/html.json](https://gist.github.com/hei-a/73c9ccdad642b64d6d1c03b629ee14c7)
