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
    locals: require('./modules/locals'),

    handleError: require('./core/handleError'),

    composeApp: require('./core/composeApp'),

    utils: require('./utils'),
};
