module.exports = {
    bodyParser: require('./modules/bodyParser'),
    compression: require('./modules/compression'),
    cors: require('./modules/cors'),
    mongoose: require('./modules/mongoose'),
    morgan: require('./modules/morgan'),
    session: require('./modules/session'),
    publicFolder: require('./modules/publicFolder'),
    view: require('./modules/view'),
    dotenv: require('./modules/dotenv'),

    handleError: require('./utils/handleError'),

    composeApp: require('./core/composeApp'),
    composeModel: require('./core/composeModel'),

    utils: require('./utils'),
};
