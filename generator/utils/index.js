const fs = require('fs');

module.exports.injectChanges = (api, code, path) => {
  const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
  const mainPath = api.resolve(`${path}.${ext}`);
  const contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
  if (!contentMain.includes(code)) {
    const lines = contentMain.split(/\r?\n/g).reverse();
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += code;
    const output = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, output, { encoding: 'utf-8' });
  }
};

module.exports.lint = (api) => {
  if (api.hasPlugin('eslint')) {
    // eslint-disable-next-line global-require, import/no-unresolved
    const lint = require('@vue/cli-plugin-eslint/lint');
    lint({
      silent: false,
      _: ['./']
    }, api);
  }
};
