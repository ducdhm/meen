const express = require('express');
const deepExtend = require('deep-extend');
const logger = require('../utils/logger');
const defaultConfig = require('./defaultConfig');
const resolvePath = require('../utils/resolvePath');

module.exports = (appName, config, modules) => {
    const log = logger('composeApp', 'M.E.E.N');

    if (typeof modules === 'undefined') {
        modules = config;
        config = {};
    }

    let fileConfig;
    try {
        fileConfig = require(resolvePath('config', 'app.js'));
    } catch (e) {
        log.warn(`"/config/app.js" file does not exist`);
    }

    const app = express();
    app.id = appName;
    let appConfig = app.config = deepExtend(defaultConfig, fileConfig, config);

    app.logger = (category) => {
        return logger(category, appName, appConfig.logger.level, appConfig.logger.logFile);
    };

    app.run = () => {
        let appPort = appConfig[`${appName}Port`];

        app.listen(
            appPort,
            () => log.info(`Webserver started at http://localhost:${appPort}`)
        );
    };

    switch (appConfig.preset) {
        case 'website':
            require('../modules/compression')(app, appConfig);
            require('../modules/minify')(app, appConfig);
            require('../modules/publicFolder')(app, appConfig);
            require('../modules/view')(app, appConfig);
            require('../modules/session')(app, appConfig);
            require('../modules/bodyParser')(app, appConfig);
            require('../modules/mongoose')(app, appConfig);
            require('../modules/morgan')(app, appConfig);
            break;

        case 'api':
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
        require('../utils/handleError')(app, appConfig);
    }

    return app;
};
