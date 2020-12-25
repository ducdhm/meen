const publishNewVersion = require('publish-new-version');
const { execSync } = require('child_process');
const { resolvePath } = require('@meenjs/utils');
const updateIndex = require('update-index');

publishNewVersion(async (logger) => {
    logger.info(`Generate locale file`);
    execSync('node tools/genLocaleFile');

    logger.info(`Generate "src/modules/index.js" file`);
    updateIndex(resolvePath('src', 'modules'), resolvePath('src', 'modules'));

    logger.info(`Generate "src/index.js" file`);
    updateIndex(resolvePath('src'), resolvePath('src'), 'FOLDER');
});
