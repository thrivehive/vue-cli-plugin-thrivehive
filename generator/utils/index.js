const fs = require('fs');

const encoding = { encoding: 'utf-8' };

function getFile(api, path) {
  const ext = api.hasPlugin('typescript')
    ? 'ts'
    : 'js';
  const filePath = api.resolve(`${path}.${ext}`);
  const content = fs.readFileSync(filePath, encoding)
  return {
    filePath,
    content
  };
}

module.exports.injectCode = (api, path, code) => {
  const { content, filePath } = getFile(api, path);
  if (!content.includes(code)) {
    const contentLines = content.split(/\r?\n/g).reverse();
    const lastImportIndex = contentLines.findIndex(line => line.match(/^import/));
    contentLines[lastImportIndex] += code;
    const output = contentLines.reverse().join('\n');
    fs.writeFileSync(filePath, output, encoding);
  }
};

module.exports.replaceCode = (api, path, oldCode, newCode) => {
  const { content, filePath } = getFile(api, path);
  const output = content.replace(oldCode, newCode);
  fs.writeFileSync(filePath, output, encoding);
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
