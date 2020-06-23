const express = require('express');
const { getWinstonLogger } = require('@meenjs/utils');
const buildMenu = require('./buildMenu');
const initResolver = require('./initResolver');
const initUploader = require('./initUploader');
const redirectTo = require('./redirectTo');
const getConfig = require('./getConfig');
const en = require('./locale/en');
const vi = require('./locale/vi');

module.exports = (appName, config, modules) => {
    const logger = getWinstonLogger('composeApp');

    // Overloading options
    // --------------------------------
    if (typeof modules === 'undefined') {
        modules = config;
        config = {};
    }

    // Config
    // --------------------------------
    const appConfig = getConfig(appName, config, logger);
    const app = express();
    app.enable('strict routing');
    app.id = appName;
    app.config = appConfig;
    app.LOCALE = appConfig.locales[appConfig.lang];

    // Get logger with app name
    // --------------------------------
    app.logger = (category) => {
        return getWinstonLogger(category, appName);
    };

    // Alias of "listen" method
    // --------------------------------
    app.run = () => {
        let appPort = appConfig.port[appName];

        app.listen(
            appPort,
            () => logger.info(`Server "${appName}" (v${appConfig.info.version}) server started at http://localhost:${appPort}`),
        );
    };

    // Build menu
    // --------------------------------
    app.buildMenu = buildMenu;

    // Init resolver
    // --------------------------------
    app.initResolver = initResolver;

    // Init uploader
    // --------------------------------
    app.initUploader = initUploader;

    // Redirect with query string
    // --------------------------------
    app.redirectTo = redirectTo;

    // Preset
    // --------------------------------
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

    // Load module
    // --------------------------------
    modules.forEach(module => {
        if (typeof module === 'function') {
            module.call(null, app, appConfig);
        }
    });

    // "handleError" module
    // --------------------------------
    if (appConfig.handleError.enabled) {
        require('../modules/handleError')(app, appConfig);
    }

    return app;
};
