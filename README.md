# vue-cli-plugin-thrivehive

[![npm version](https://badge.fury.io/js/vue-cli-plugin-thrivehive.svg)](https://badge.fury.io/js/vue-cli-plugin-thrivehive)

This Vue CLI 3.x plugin does the following:

- Add SCSS modules folder
- Add Webpack alias for SCSS modules folder (%)
- Import `/scss/styles.scss` into `main.js`
- Install [@thrivehive/eslint-configs](https://github.com/thrivehive/eslint-configs) packages
- Update eslint config
- Update lint script to lint entire project
- Lint and fix project after installation

Start a new project with [@thrivehive/vue-preset](https://github.com/thrivehive/vue-preset) for Vue CLI 3.x (recommended):

```bash
vue create --preset thrivehive/vue-preset <project-name>
```

Add to an existing project
```bash
vue add thrivehive
```
