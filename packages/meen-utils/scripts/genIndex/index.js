const resolvePath = require('../../src/resolvePath');
const getLogger = require('../../src/getLogger');
const updateIndex = require('update-index');
const logger = getLogger();

logger.info(`Generate "index.js" file`);
updateIndex(resolvePath('src'), resolvePath('/'), 'FILE');

