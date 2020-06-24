const { resolvePath } = require('@meenjs/utils');
const en = require('./locale/en');
const vi = require('./locale/vi');

module.exports = {
    lang: 'en',
    locales: {
        en,
        vi,
    },
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
        debug: false,
        isJson: false,
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
    bruteForce: {
        collectionName: 'BRUTE_FORCE',
        maxRequest: 60,
        limitTime: 60 * 1000,
    },
};
