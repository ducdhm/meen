const preInit = require('../preInit');
const postInit = require('../postInit');
const { initStructure } = require('../utils/');
const structure = require('./structure');

module.exports = (name, cmdObj) => {
    preInit();
    initStructure(name, structure, {
        appName: name,
    });
    postInit(name);
};
