const { getFolderList } = require('@dudojs/node-utils');
const { getTargetPath } = require('../utils/');
const initStructure = require('init-structure');
const path = require('path');

module.exports = (logger) => (options) => {
    const { name } = options;
    logger.info(`Create "${name}" model`);

    const structure = {};
    structure[name] = {};
    structure[name][`index.js`] = path.join(__dirname, './template/model.index.hbs');

    initStructure(getTargetPath('@local/models'), structure, {
        name: name,
    });

    const folderList = getFolderList(getTargetPath('@local/models')).map(folder => path.parse(folder).name);
    const structureModels = {
        'index.js': path.join(__dirname, './template/models.index.hbs'),
    };
    initStructure(getTargetPath('@local/models'), structureModels, {
        models: folderList,
    });

    logger.info(`Done!`);
};
