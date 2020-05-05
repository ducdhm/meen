const deepExtend = require('deep-extend');
const { resolvePath } = require('@meenjs/utils');
const defaultConfig = require('../defaults/config');
const getLogger = require('../utils/getLogger');
const logger = getLogger('utils/getConfig');

module.exports = (config = {}) => {
    let fileConfig;
    try {
        fileConfig = require(resolvePath('@local', 'config', 'app.js'));
    } catch (e) {
        logger.warn(`"/@local/config/app.js" file does not exist\nError:%o`, e);
    }

    return deepExtend(defaultConfig, fileConfig, config);
};
