# `vue-cli-plugin-thrivehive`

[![npm version](https://badge.fury.io/js/vue-cli-plugin-thrivehive.svg)](https://badge.fury.io/js/vue-cli-plugin-thrivehive)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This [Vue CLI 3.x](https://cli.vuejs.org/) plugin does the following:

- Add separate module for registering global Vue components, initializing plugins (`@/utils/setup`), which is then reused for [Storybook](https://storybook.js.org/basics/guide-vue/)
- Adds `src/scss` for global styles
- Install [@thrivehive/eslint-configs](https://github.com/thrivehive/eslint-configs) packages
- Update eslint config
- Update lint script to lint entire project
- Lint and fix project after installation

## Start a new project

Install using [@thrivehive/vue-preset](https://github.com/thrivehive/vue-preset) for [Vue CLI 3.x](https://cli.vuejs.org/) (recommended):

Make sure Vue CLI is installed:

```bash
npm i -g @vue/cli
```

Install the CLI Plugin:

```bash
vue create --preset thrivehive/vue-preset <project-name>
```

## Add to an existing project

Adding to an existing project is not recommended, as CLI plugins may modify and/or overwrite existing modules. Make sure to commit before attempting this.

If your project does not require [Vuetify](https://vuetifyjs.com/en/) or [Storybook](https://storybook.js.org/basics/guide-vue/), skip the first two commands.

```bash
vue add vuetify
vue add storybook
vue add thrivehive
```

## Releases

- Run `npm version major|minor|patch` to increment version
- Run `npm publish` to release
