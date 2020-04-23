const deepExtend = require('deep-extend');
const { resolvePath, getLogger } = require('meen-utils');
const defaultConfig = require('../core/defaultConfig');
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
