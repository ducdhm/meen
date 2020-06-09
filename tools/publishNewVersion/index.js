const publishNewVersion = require('publish-new-version');
const { execSync } = require('child_process');

publishNewVersion(async (logger) => {
    logger.info(`Generate "modules/index.js" file`);
    execSync(`node tools/genModuleIndex`);
});
