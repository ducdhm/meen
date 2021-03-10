const preInit = require('../preInit');
const postInit = require('../postInit');
const initStructure = require('init-structure');
const structureWeb = require('./structure');
const { getTargetPath } = require('../utils');

module.exports = (name, cmdObj) => {
    preInit();

    const structure = {};
    structure[name] = structureWeb;

    initStructure(getTargetPath(), structure, {
        appName: name,
    });

    postInit(name);
};
