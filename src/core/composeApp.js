const express = require('express');
const deepExtend = require('deep-extend');
const logger = require('../utils/logger');
const defaultConfig = require('./defaultConfig');

module.exports = (appName, options, modules) => {
    const app = express();
    const log = logger('composeApp', 'M.E.E.N');
    app.id = appName;
    let config = app.config = deepExtend(defaultConfig, options);
    
    app.logger = (category) => {
        return logger(category, appName, app.config.logger.level, app.config.logger.logFile);
    };
    
    app.run = () => {
        let appPort = app.config[`${appName}Port`];
        
        app.listen(
            appPort,
            () => log.info(`Webserver started at http://localhost:${appPort}`)
        );
    };

    switch (config.preset) {
        case 'website':
            require('../modules/compression')(app, app.config);
            require('../modules/minify')(app, app.config);
            require('../modules/publicFolder')(app, app.config);
            require('../modules/view')(app, app.config);
            require('../modules/session')(app, app.config);
            require('../modules/bodyParser')(app, app.config);
            require('../modules/mongoose')(app, app.config);
            require('../modules/morgan')(app, app.config);
            break;

        case 'api':
            require('../modules/cors')(app, app.config);
            require('../modules/bodyParser')(app, app.config);
            require('../modules/mongoose')(app, app.config);
            require('../modules/morgan')(app, app.config);
            break;

        default:
            // Do nothing
    }
    
    modules.forEach(module => {
        if (typeof module === 'function') {
            module.call(null, app, app.config);
        }
    });
    
    if (config.handleError.enabled) {
        require('./handleError')(app, app.config);
    }
    
    return app;
};
