const fs = require('fs');

const importStyles = '\nimport \'./scss/styles.scss\'';

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      '@thrivehive/eslint-config-vue': '^1.0.2'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    // inject to main.js
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
    const mainPath = api.resolve(`./src/main.${ext}`);
    // get content
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();
    // inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += importStyles;
    // modify app
    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });
};
