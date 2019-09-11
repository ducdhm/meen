// Connect to our database
// --------------------------------
const mongooseLogger = require('../utils/logger')('MONGOOSE');
const mongoose = require('mongoose');
module.exports = (app, config) => {
    mongoose.set('useCreateIndex', true);
    
    config.mongoose.debug && mongoose.set('debug', (collection, method, query, doc) => {
        mongooseLogger.debug('"%s" in "%s" \n%o', method, collection, {
            query,
            doc
        });
    });
    
    mongoose.connect(config.mongoose.url, config.mongoose.options);
    mongoose.Promise = require('q').Promise;
};
