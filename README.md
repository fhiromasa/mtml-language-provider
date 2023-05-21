## Overview

This extension provide these features. (この拡張機能は以下の機能を提供します。)

- highlight
- hover
- completion
- definition(beta)

You can use these CMS' tags and modifiers. (以下の CMS の mt タグ、モディファイアを使用できます。)

- Movable Type
- Movable Type.net
- PowerCMS
- PowerCMS X

## Features

Works with `*.mtml` files. (mtml 拡張子のファイルで動作します。)

### Syntax Highlight

Highlight in `Dark+(default dark)` vscode theme. (Dark ＋(規定の Dark)でのハイライト)

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

Display the tag description when the cursor hovers over the tag. (カーソルが mt タグにホバーした時はタグの説明を表示します。)

Show tag description and global modifier description when the cursor hovers over a global modifier. (カーソルがグローバルモディファイアにホバーした時はモディファイアの説明とタグの説明を表示します。)

If you want to disable this feature, Set `editor.hover.enable:false` in `.vscode/settings.json`. (この機能をオフにしたければ`editor.hover.enable:false`を設定ファイルに書いてください。)

![hover item for tag](./images/hovarImage_onTag.png)

![hover item for global modifier](./images/hoverImage_onGlobalModifier.png)

### Completion

Outside the tag, the tag is given as a completion candidate. (タグの外側では MT タグを補完候補として挙げます。)

When you hit a `half-width` space inside the tag, MT tag modifiers and global modifiers are listed as completion candidates.(タグの内側で半角スペースを打ったときに MT タグのモディファイアとグローバルモディファイアを補完候補として挙げます。)

When you hit `=` after the modifier, the possible values ​​of the modifier are given as completion candidates. Also, when the modifier is name, var, setvar, the variable name in the file is also given as a completion candidate. Furthermore, when you hit `$` in the modifier's `""`, the variable names in the file are also given as completion candidates. (モディファイアの後ろで = を打ったときにモディファイアのとりうる値を補完候補としてあげます。また、モディファイアが name, var, setvar だったときにはファイル内の変数名も一緒に補完候補としてあげます。さらに、モディファイアの "" のなかで $ を打ったときも同様にファイル内の変数名を補完候補としてあげます。)

If you want to disable this feature, Set `mtml.completion.enable:false` in `.vscode/settings.json`. (この機能をオフにしたければ`mtml.completion.enable:false`を設定ファイルに書いてください。)

![completion item for tag](./images/completionImage_tag.png)

![completion item for global modifier](./images/completionImage_Modifier.png)

![completion item for global modifier](./images/completionImage_ModifierValue.png)

### Definition

This feature is in beta. (この機能はベータ版です。)

Jump to user variables with variable definition tags such as MTVar. (MTVar などの変数定義タグによるユーザー変数へジャンプします。)

Only variables within the same file can be jumped. (同一ファイル内の変数のみジャンプのみ可能です。)

This feature is turned off by default. If you want to enable this feature, Set `mtml.definition.enable:true` in `.vscode/settings.json`. (この機能はデフォルトでオフになっています。使いたい場合は`mtml.definition.enable:true`を設定ファイルに書いてください。)

## Extension Settings

This extension contributes the following settings(この拡張機能は以下の設定をサポートします):

- `mtml.hover.enable`: hover feature
  - true: enable
  - false: disable
- `mtml.completion.enable`: completion feature
  - true: enable
  - false: disable
- `mtml.definition.enable`: definition feature
  - true: enable
  - false: disable
- `mtml.cms.type`: What is your CMS? Select after.
  - `Movable Type` default
  - `Movable Type.net`
  - `PowerCMS`
  - `PowerCMS X`

## Super Thanks

- Syntax Highlighting - [yupyom/vscode-movabletype](https://github.com/yupyom/vscode-movabletype/tree/0.1.0)
- My sponsors - [github sponsors](https://github.com/sponsors/fhiromasa)

## About Data

The json file in src/data was created in the [mtmlItemMaker repository](https://github.com/fhiromasa/mtmlItemMaker). (src/data にある json ファイルは mtmlItemMaker のリポジトリで作ったものです。)

I don't use anything other than item.ts for this extension. (item.ts 以外はこの拡張機能として使っていません。)

Since mtmlItemMaker repository is used as a submodule, it is necessary to update it with the following command. (このリポジトリをサブモジュールとして使っているので以下のコマンドでたまにアップデートが必要です？)

```sh
$ git submodule update
```
