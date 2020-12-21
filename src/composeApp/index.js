const express = require('express');
const http = require('http');
const { getWinstonLogger } = require('@meenjs/utils');
const buildMenu = require('./buildMenu');
const initResolver = require('./initResolver');
const initUploader = require('./initUploader');
const initPaginator = require('./initPaginator');
const redirectTo = require('./redirectTo');
const checkPermission = require('./checkPermission');
const requirePermission = require('./requirePermission');
const checkRole = require('./checkRole');
const requireRole = require('./requireRole');
const initFormatter = require('./initFormatter');
const setLocals = require('./setLocals');
const returnJsonError = require('./returnJsonError');
const loadLocalPackage = require('./loadLocalPackage');
const getConfig = require('./getConfig');

module.exports = (appName, config, modules) => {
    const logger = getWinstonLogger('composeApp', 'info');

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
    const server = http.createServer(app);
    app.enable('strict routing');
    app.id = appName;
    app.server = server;
    app.config = appConfig;
    app.LOCALE = appConfig.locales[appConfig.lang];

    // Get logger with app name
    // --------------------------------
    app.logger = (category) => {
        return getWinstonLogger(category, appConfig.logger.level, appConfig.logger.logFile, appName);
    };

    // Alias of "listen" method
    // --------------------------------
    app.run = () => {
        let appPort = appConfig.port[appName];

        server.listen(
            appPort,
            () => logger.info(`Server "${appName}" (v${appConfig.info.version}) server started at http://localhost:${appPort}`),
        );
    };

    // Auto load @local package
    // --------------------------------
    loadLocalPackage(app, logger);

    // Build menu
    // --------------------------------
    app.buildMenu = (menuConfig, req) => buildMenu(app, menuConfig, req);

    // Init resolver
    // --------------------------------
    app.initResolver = (Model, propName, handler, ignoreNew) => initResolver(app, Model, propName, handler, ignoreNew);

    // Init uploader
    // --------------------------------
    app.initUploader = (options) => initUploader(app, options);

    // Require permission middlewares
    // --------------------------------
    app.requirePermission = (permission) => requirePermission(app, permission);

    // Check permission
    // --------------------------------
    app.checkPermission = (req, permission) => checkPermission(app, req, permission);

    // Require role middlewares
    // --------------------------------
    app.requireRole = (roleList) => requireRole(roleList);

    // Check role
    // --------------------------------
    app.checkRole = (req, roleList) => checkRole(req, roleList);

    // Init paginator
    // --------------------------------
    app.initPaginator = (Model, originItemPerPage) => initPaginator(app, Model, originItemPerPage);

    // Init formatter
    // --------------------------------
    app.initFormatter = (extraFormatter) => initFormatter(app, extraFormatter);

    // Set locals
    // --------------------------------
    app.setLocals = (key, value) => setLocals(app, key, value);

    // Redirect with query string
    // --------------------------------
    app.redirectTo = (url, ignoreQueryList) => redirectTo(app, url, ignoreQueryList);

    // Return error as JSON format
    // --------------------------------
    app.returnJsonError = returnJsonError;

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
