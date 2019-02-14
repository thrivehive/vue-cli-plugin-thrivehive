const fs = require('fs');
const path = require('path');

const encoding = { encoding: 'utf-8' };

/**
 * get file from new project
 *
 * @param {Object} api
 * @param {String} relativePath
 * @param {Boolean} [addExtension=false]    should we add script extension
 * @returns
 */
const getFile = (api, relativePath, addExtension = false) => {
  let extension = '';
  if (addExtension) {
    extension = api.hasPlugin('typescript')
      ? '.ts'
      : '.js';
  }
  const filePath = api.resolve(`${relativePath}${extension}`);
  const content = fs.readFileSync(filePath, encoding);
  return {
    filePath,
    content
  };
};

/**
 * grab name from package.json
 *
 * @param {Object} api
 * @returns String
 */
const getPackageName = (api) => {
  const { content } = getFile(api, './package.json');
  const json = JSON.parse(content);
  return json.name;
};

/**
 * render template strings

 * processTemplate('Hello ${0}, my name is ${1}, ${2}', ['Jill', 'John', 'Doe']);
 * returns 'Hello Jill, my name is John Doe'
 *
 * @param {String} template
 * @param {Array} data
 * @returns String
 */
const processTemplate = (template, data) => (
  template.replace(/\$\{\d\}/gi, i => data[i.replace(/[^0-9.]/g, '')])
);

/**
* inject README from template with new project name
*
* @param {Object} api
*/
module.exports.injectReadme = (api) => {
  const name = getPackageName(api);
  const content = fs.readFileSync(path.resolve(__dirname, '../README.md'), encoding);
  const readme = processTemplate(content, [name]);
  fs.writeFileSync('./README.md', readme, encoding);
};

/**
* inject code after import statements
*
* @param {Object} api
* @param {String} relativePath
* @param {String} code
*/
module.exports.injectCode = (api, relativePath, code) => {
  const { content, filePath } = getFile(api, relativePath, true);
  if (!content.includes(code)) {
    const contentLines = content.split(/\r?\n/g).reverse();
    const lastImportIndex = contentLines.findIndex(line => line.match(/^import/));
    contentLines[lastImportIndex] += code;
    const output = contentLines.reverse().join('\n');
    fs.writeFileSync(filePath, output, encoding);
  }
};

/**
* replace lines of code
*
* @param {Object} api
* @param {String} relativePath
* @param {String} oldCode
* @param {String} newCode
*/
module.exports.replaceCode = (api, relativePath, oldCode, newCode) => {
  const { content, filePath } = getFile(api, relativePath, true);
  const output = content.replace(oldCode, newCode);
  fs.writeFileSync(filePath, output, encoding);
};

/**
* lint new project
*
* @param {Object} api
*/
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
