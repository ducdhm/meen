const { resolvePath, getLogger } = require('@meenjs/utils');
const logger = getLogger();
const updateIndex = require('update-index');

logger.info(`Generate "src/modules/index.js" file`);
updateIndex(resolvePath('src', 'modules'), resolvePath('src', 'modules'));

logger.info(`Generate "src/index.js" file`);
updateIndex(resolvePath('src'), resolvePath('src'), 'FOLDER');
