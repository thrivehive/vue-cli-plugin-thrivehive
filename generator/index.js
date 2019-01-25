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
    injectChanges(api);
    lint(api);
  });
};
