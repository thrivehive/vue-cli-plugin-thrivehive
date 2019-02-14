const {
  injectReadme,
  injectCode,
  replaceCode,
  lint
} = require('./utils');

const mainChanges = `
import '@/utils/setup'`;

const storybookConfigChanges = `
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import '@/utils/setup'

Vue.use(Vuetify)

addDecorator(() => ({
  template: '<v-app><story/></v-app>'
}))`;

module.exports = (api) => {
  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve --open',
      lint: 'vue-cli-service lint -- ./'
    },
    dependencies: {
      'vee-validate': '^2.1.7'
    },
    devDependencies: {
      '@thrivehive/eslint-config-node': '^1.2.0',
      '@thrivehive/eslint-config-vue': '^1.2.0'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    injectReadme(api);
    injectCode(api, './src/main', mainChanges);

    if (api.hasPlugin('storybook')) {
      const storybookConfigPath = './config/storybook/config';
      injectCode(api, storybookConfigPath, storybookConfigChanges);
      replaceCode(
        api,
        storybookConfigPath,
        `import { configure } from '@storybook/vue'`,
        `import { configure, addDecorator } from '@storybook/vue'`
      );
    }

    lint(api);
  });
};
