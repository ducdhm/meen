const fs = require('fs');
const path = require('path');
const deepExtend = require('deep-extend');
const defaultConfig = require('../config');
const { resolvePath, getFileList } = require('@meenjs/utils');

module.exports = (appName, config, logger) => {
    let localFileConfig;
    try {
        localFileConfig = require(resolvePath('@local', 'config', 'app.js'));
    } catch (e) {
        logger.warn(`Error when reading "/@local/config/app.js" file\n%o`, e);
    }

    let appFileConfig = {};
    let configFolderPath = resolvePath(appName, 'config');
    if (fs.existsSync(configFolderPath)) {
        getFileList(configFolderPath).forEach((file) => {
            const fileInfo = path.parse(file);
            try {
                appFileConfig[fileInfo.name] = require(file);
            } catch (e) {
                logger.warn(`Error when reading "${file}" file\n%o`, e);
            }
        });
    }

    return deepExtend(defaultConfig, localFileConfig, appFileConfig, config);
};
