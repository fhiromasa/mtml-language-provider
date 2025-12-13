# mtml language provider

This extension provide these features.

- highlight
- hover
- completion
- definition(beta)

You can use these CMS' tags and modifiers.

- Movable Type
- Movable Type.net
- PowerCMS
- PowerCMS X

## Features

Works with `*.mtml` files.

### Syntax Highlight

Highlight in `Dark+(default dark)` vscode theme.

![highlightImage.png](./images/highlightImage.png "highlightImage.png")

### Hover

Display the tag description when the cursor hovers over the tag.
Show tag description and global modifier description when the cursor hovers over a global modifier.
If you want to disable this feature, Set `editor.hover.enable:false` in `.vscode/settings.json`.

![hover item for tag](./images/hovarImage_onTag.png)

![hover item for global modifier](./images/hoverImage_onGlobalModifier.png)

### Completion

Outside the tag, the tag is given as a completion candidate.
When you hit a `half-width` space inside the tag, MT tag modifiers and global modifiers are listed as completion candidates.
When you hit `=` after the modifier, the possible values ​​of the modifier are given as completion candidates. Also, when the modifier is `name, var, setvar`, the variable name in the file is also given as a completion candidate. Furthermore, when you hit `$` in the modifier's `""`, the variable names in the file are also given as completion candidates.
If you want to disable this feature, Set `mtml.completion.enable:false` in `.vscode/settings.json`.

![completion item for tag](./images/completionImage_tag.png)

![completion item for global modifier](./images/completionImage_Modifier.png)

![completion item for global modifier](./images/completionImage_ModifierValue.png)

### Definition(beta)

This feature is in beta.
Jump to user variables with variable definition tags such as MTVar.
Only variables within the same file can be jumped.
This feature is turned off by default. If you want to enable this feature, Set `mtml.definition.enable:true` in `.vscode/settings.json`.

## Extension Settings

This extension contributes the following settings:

- `mtml.completion.enable`: completion feature
  - `true`: enable
  - `false`: disable
- `mtml.definition.enable`: definition feature
  - `true`: enable
  - `false`: disable
- `mtml.cms.type`: What is your CMS? Select after.
  - `Movable Type` default
  - `Movable Type.net`
  - `PowerCMS`
  - `PowerCMS X`

## Super Thanks

- Syntax Highlighting - [yupyom/vscode-movabletype](https://github.com/yupyom/vscode-movabletype/tree/0.1.0)
- My sponsors - [github sponsors](https://github.com/sponsors/fhiromasa)
