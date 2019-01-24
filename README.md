# vue-cli-plugin-thrivehive

This Vue CLI 3.x plugin does the following:

- Add SCSS modules folder
- Add Webpack alias for SCSS modules folder (%)
- Import `/scss/styles.scss` into `main.js`
- Install [@thrivehive/eslint-configs](https://github.com/thrivehive/eslint-configs) packages
- Update eslint config

Add to an existing project
```bash
vue add thrivehive
```

Use the @thrivehive Vue CLI 3.x preset:

```bash
vue create --preset thrivehive/vue-preset <project-name>
