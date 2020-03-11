const { resolvePath } = require('meen-utils');

module.exports = {
    preset: null,
    info: {
        title: 'M.E.E.N',
        version: '1.0.0',
    },
    mongoose: {
        debug: false,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    cors: '*',
    session: {
        secret: 'M.E.E.N',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    publicFolder: {
        path: resolvePath('public'),
        debug: false,
    },
    view: {
        minify: false,
        cache: false,
    },
    handleError: {
        enabled: true,
        debug: true,
        isJson: false,
        locale: {
            error404: 'Page Not Found',
            error500: 'Server Internal Error',
            title: 'Error {{ERROR_CODE}}',
        },
    },
    bodyParser: {
        json: {
            limit: '5mb',
        },
        urlencoded: {
            limit: '5mb',
            extended: true,
        },
    },
};
