# 拡張機能をパブリッシュするときにすること

1. README.md , CHANGELOG.md をリリースに向けて書く
1. pull_request を出すブランチにて `npm version --no-git-tag-version patch | minor | major` 実行する
1. ブランチをプッシュしてプルリクエストを発行する

## ここから Actions で行われること

1. npm run unit:test
1. vsce publish -p ""
1. git push --tags --force
