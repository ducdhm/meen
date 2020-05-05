const express = require('express');
const getConfig = require('../utils/getConfig');
const getLogger = require('../utils/getLogger');

module.exports = (appName, config, modules) => {
    if (typeof modules === 'undefined') {
        modules = config;
        config = {};
    }

    const appConfig = getConfig(config);
    const logger = getLogger('composeApp');

    const app = express();
    app.id = appName;
    app.config = appConfig;

    app.logger = (category) => {
        return getLogger(category, appName);
    };

    app.run = () => {
        let appPort = appConfig.port[appName];

        app.listen(
            appPort,
            () => logger.info(`Server "${appName}" (v${appConfig.info.version}) server started at http://localhost:${appPort}`),
        );
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
