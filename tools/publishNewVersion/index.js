const { publishNewVersion } = require('@meenjs/utils');
const { execSync } = require('child_process');

publishNewVersion(async (logger) => {
    logger.info(`Generate "modules/index.js" file`);
    execSync(`node tools/genModuleIndex`);
});
