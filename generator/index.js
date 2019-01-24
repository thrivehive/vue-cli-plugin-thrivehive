const { injectChanges, lint } = require('./utils');

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      '@thrivehive/eslint-config-node': '^1.0.3',
      '@thrivehive/eslint-config-vue': '^1.0.3'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    injectChanges(api);
    lint(api);
  });
};
