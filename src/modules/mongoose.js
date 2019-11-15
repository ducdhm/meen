// Connect to our database
// --------------------------------
const mongoose = require('mongoose');
const { getLogger } = require('meen-utils');
const logger = getLogger('MONGOOSE');
module.exports = (app, config) => {
    mongoose.set('useCreateIndex', true);

    config.mongoose.debug && mongoose.set('debug', (collection, method, query, doc) => {
        logger.debug('"%s" in "%s" \n%o', method, collection, {
            query,
            doc
        });
    });

    mongoose.connect(config.mongoose.url, config.mongoose.options);
    mongoose.Promise = require('q').Promise;
};
