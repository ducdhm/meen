const { toKebabCase, toTitleCase } = require('@meenjs/utils');
const { initStructure } = require('../utils/');
const path = require('path');

module.exports = (logger) => (options) => {
    const { name } = options;
    logger.info(`Create "${name}" local package`);

    const structure = {};
    structure[name] = {};
    structure[name][`index.js`] = path.join(__dirname, './template/index.hbs');
    structure[name][`package.json`] = path.join(__dirname, './template/package.json.hbs');
    structure[name][`README.md`] = path.join(__dirname, './template/readme.hbs');
    initStructure('@local', structure, {
        name,
        nameTitle: toTitleCase(name),
        nameKebab: toKebabCase(name),
    });

    logger.info(`Done!`);
};
