const deepExtend = require('deep-extend');
const resolvePath = require('../utils/resolvePath');
const defaultConfig = require('meen-core/src/core/defaultConfig');
const logger = require('../utils/getLogger')('utils/getConfig');

module.exports = (config = {}) => {
    let fileConfig;
    try {
        fileConfig = require(resolvePath('config', 'app.js'));
    } catch (e) {
        logger.warn(`"/config/app.js" file does not exist\nError:%o`, e);
    }

    return deepExtend(defaultConfig, fileConfig, config);
};
