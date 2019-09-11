const resolvePath = require('../utils/resolvePath');

module.exports = {
    preset: null,
    mongoose: {
        debug: false,
        options: {
            useNewUrlParser: true
        }
    },
    cors: '*',
    logger: {
        level: 'debug',
        logFile: false
    },
    session: {
        secret: 'M.E.E.N',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    publicFolder: {
        path: resolvePath('public')
    },
    minify: false,
    view: {
        cache: false
    },
    auth: null,
    handleError: {
        enabled: false,
        debug: true,
        isJson: false
    },
    locals: {
        enabled: false,
        custom: null
    }
};
