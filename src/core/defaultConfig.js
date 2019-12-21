const { resolvePath } = require('meen-utils');

module.exports = {
    preset: null,
    mongoose: {
        debug: false,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        itemPerPage: 20,
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
        enabled: false,
        debug: true,
        isJson: false,
    },
};
