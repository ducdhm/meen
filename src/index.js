module.exports = {
    bodyParser: require('./modules/bodyParser'),
    compression: require('./modules/compression'),
    cors: require('./modules/cors'),
    minify: require('./modules/minify'),
    mongoose: require('./modules/mongoose'),
    morgan: require('./modules/morgan'),
    session: require('./modules/session'),
    publicFolder: require('./modules/publicFolder'),
    view: require('./modules/view'),

    handleError: require('./core/handleError'),

    composeApp: require('./core/composeApp'),
    composeModel: require('./core/composeModel'),

    utils: require('./utils'),
};
