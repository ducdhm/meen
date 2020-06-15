const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { newError } = require('@meenjs/utils');

module.exports = (app) => {
    const { config } = app;

    const limiter = new RateLimit({
        store: new MongoStore({
            uri: config.mongoose.url,
            collectionName: config.bruteForce.collectionName,
            expireTimeMs: config.bruteForce.limitTime,
        }),
        max: config.bruteForce.maxRequest,
        windowMs: config.bruteForce.limitTime,
        handler: (req, res, next) => next(newError(config.bruteForce.errorCode, config.bruteForce.errorMessage)),
    });

    app.use(limiter);
};
