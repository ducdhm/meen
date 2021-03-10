const preInit = require('../preInit');
const postInit = require('../postInit');
const initStructure = require('init-structure');
const structureApi = require('./structure');
const { getTargetPath } = require('../utils');

module.exports = (name, cmdObj) => {
    preInit();

    const structure = {};
    structure[name] = structureApi;

    initStructure(getTargetPath(), structure, {
        appName: name,
    });

    postInit(name);
};
