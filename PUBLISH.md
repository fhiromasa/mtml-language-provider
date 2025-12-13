# How to publish extension

1. merge all changes into `main` branch.
2. update README.md, CHANGELOG.md and package.json.
  `npm version --no-git-tag-version patch | minor | major`
3. create github release and tag.

## In Github Actions

Once a tag is created on the main branch,

1. npm run unit:test
2. vsce publish -p ""
