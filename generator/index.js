const {
  injectReadme,
  injectCode,
  lint
} = require('./utils');

const mainChanges = `
import '@/utils/setup'`;

module.exports = (api) => {
  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve --open',
      lint: 'vue-cli-service lint -- ./'
    },
    dependencies: {
      'vee-validate': '^2.2.12'
    },
    devDependencies: {
      '@thrivehive/eslint-config-node': '^1.2.3',
      '@thrivehive/eslint-config-vue': '^1.2.3',
      '@storybook/addon-actions': '^5.1.9',
      '@storybook/addon-knobs': '^5.1.9',
      '@storybook/addon-notes': '^5.1.9',
      'markdown-loader': '^5.0.0'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    injectReadme(api);
    injectCode(api, './src/main', mainChanges);
    lint(api);
  });
};
