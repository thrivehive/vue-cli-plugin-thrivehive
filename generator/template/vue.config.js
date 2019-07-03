/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  lintOnSave: 'error',
  chainWebpack: ($config) => {
    $config.resolve.alias
      .set('%', path.resolve(__dirname, 'src/scss/modules'));
    $config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('markdown-loader')
      .loader('markdown-loader')
      .loader('html-loader')
      .end();
  }
};
