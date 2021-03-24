const logger = require('@dudojs/logger')();
const path = require('path');
const updateIndex = require('update-index');

logger.info(`Generate "src/modules/index.js" file`);
updateIndex(
    path.join(__dirname, '..', '..', 'src', 'modules'),
    path.join(__dirname, '..', '..', 'src', 'modules'),
);

logger.info(`Generate "src/index.js" file`);
updateIndex(
    path.join(__dirname, '..', '..', 'src'),
    path.join(__dirname, '..', '..', 'src'),
    'FOLDER',
);
