const { injectChanges, lint } = require('./utils');

const mainChanges = `
import setup from '@/utils/setup';`;

const storybookConfigChanges = `
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '@/utils/setup';

Vue.use(Vuetify);

addDecorator(() => ({
  template: '<v-app><story/></v-app>'
}));`;

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
      '@thrivehive/eslint-config-node': '^1.0.4',
      '@thrivehive/eslint-config-vue': '^1.0.4'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    injectChanges(api, mainChanges, './src/main');

    if (api.hasPlugin('storybook')) {
      injectChanges(api, storybookConfigChanges, './config/storybook/config');
    }

    lint(api);
  });
};
