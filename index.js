module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      '@thrivehive/eslint-config-vue': 'latest'
    },
  });
};
