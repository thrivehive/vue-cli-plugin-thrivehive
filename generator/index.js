const { injectChanges, lint } = require('./utils');

module.exports = (api) => {
  api.extendPackage({
    scripts: {
      lint: 'vue-cli-service lint -- ./'
    },
    devDependencies: {
      '@thrivehive/eslint-config-node': '^1.0.4',
      '@thrivehive/eslint-config-vue': '^1.0.4'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    const mainChanges = (
      '\nimport setup from \'@/utils/setup\';'
      + '\nimport \'./scss/styles.scss\';'
      + '\n\nsetup(Vue);'
    );
    injectChanges(api, mainChanges, './src/main');

    if (api.hasPlugin('storybook')) {
      const storybookConfigChanges = (
        '\nimport Vue from \'vue\';'
        + '\nimport setup from \'@/utils/setup\';'
        + '\nimport \'../../src/scss/styles.scss\';'
        + '\n\nsetup(Vue);'
      );
      injectChanges(api, storybookConfigChanges, './config/storybook/config');
    }

    lint(api);
  });
};
