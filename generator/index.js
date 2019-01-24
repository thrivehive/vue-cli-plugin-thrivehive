const fs = require('fs');

const importStyles = '\nimport \'./scss/styles.scss\';';

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      '@thrivehive/eslint-config-node': '^1.0.3',
      '@thrivehive/eslint-config-vue': '^1.0.3'
    }
  });
  api.render('./template');
  api.onCreateComplete(() => {
    // inject to main.js
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
    const mainPath = api.resolve(`./src/main.${ext}`);
    const contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    if (!contentMain.includes(importStyles)) {
      const lines = contentMain.split(/\r?\n/g).reverse();
      // inject import 'styles.scss';
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));
      lines[lastImportIndex] += importStyles;
      const output = lines.reverse().join('\n');
      fs.writeFileSync(mainPath, output, { encoding: 'utf-8' });
    }
  });
};
