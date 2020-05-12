const express = require('express');
const deepExtend = require('deep-extend');
const { resolvePath, getWinstonLogger } = require('@meenjs/utils');
const defaultConfig = require('../defaults/config');

module.exports = (appName, config, modules) => {
    const logger = getWinstonLogger('composeApp');

    if (typeof modules === 'undefined') {
        modules = config;
        config = {};
    }

    let fileConfig;
    try {
        fileConfig = require(resolvePath('@local', 'config', 'app.js'));
    } catch (e) {
        logger.warn(`"/@local/config/app.js" file does not exist\nError:%o`, e);
    }
    const appConfig = deepExtend(defaultConfig, fileConfig, config);

    const app = express();
    app.enable('strict routing');
    app.id = appName;
    app.config = appConfig;

    app.logger = (category) => {
        return getWinstonLogger(category, appName);
    };

    app.run = () => {
        let appPort = appConfig.port[appName];

        app.listen(
            appPort,
            () => logger.info(`Server "${appName}" (v${appConfig.info.version}) server started at http://localhost:${appPort}`),
        );
    };

    app.getWithEndSlash = (url, ...others) => {
        const isEndSlash = /\?[^]*\//.test(url);
        const urlWithoutEndSlash = isEndSlash ? url.slice(0, -1) : url;
        const urlWithEndSlash = isEndSlash ? url : url + '/';

        app.get(
            urlWithoutEndSlash,
            (req, res, next) => res.redirect(301, urlWithEndSlash),
        )

        app.get(
            urlWithEndSlash,
            ...others,
        )
    };

    app.postWithJsonResponse = (url, ...others) => {
        app.post(
            url,
            (req, res, next) => {
                req.returnJson = true;
                next();
            },
            ...others,
        )
    };

    switch (appConfig.preset) {
        case 'website':
            require('../modules/compression')(app, appConfig);
            require('../modules/publicFolder')(app, appConfig);
            require('../modules/view')(app, appConfig);
            require('../modules/session')(app, appConfig);
            require('../modules/bodyParser')(app, appConfig);
            require('../modules/mongoose')(app, appConfig);
            require('../modules/morgan')(app, appConfig);
            break;

        case 'api':
            appConfig.handleError.isJson = true;

            require('../modules/cors')(app, appConfig);
            require('../modules/bodyParser')(app, appConfig);
            require('../modules/mongoose')(app, appConfig);
            require('../modules/morgan')(app, appConfig);
            break;

        default:
        // Do nothing
    }

    modules.forEach(module => {
        if (typeof module === 'function') {
            module.call(null, app, appConfig);
        }
    });

    if (appConfig.handleError.enabled) {
        require('../modules/handleError')(app, appConfig);
    }

    return app;
};
