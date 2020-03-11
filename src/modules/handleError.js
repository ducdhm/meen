const { errorHandlers } = require('meen-utils');

module.exports = (app, config) => {
    const logger = app.logger('ERROR');

    app.use((req, res, next) => {
        next(errorHandlers.newError(404));
    });

    app.use((error, req, res, next) => {
        error.code = error.code || 500;

        // Add this line to include winston logging
        logger.error(`${error.code} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);

        let debugMode = false;
        if (req.query.hasOwnProperty('debug')) {
            debugMode = true;
        }
        if (config.handleError.debug) {
            debugMode = true;
        }

        // Normalize message for common error code
        switch (error.code) {
            case 404:
                error.message = config.handleError.locale.error404;
                break;

            case 500:
                error.message = config.handleError.locale.error500;
                break;

            default:
                // Do nothing
        }

        if (config.handleError && config.handleError.isJson) {
            return errorHandlers.jsonError(error, res, debugMode);
        } else {
            let title = config.handleError.title;
            title = title.replace('{{ERROR_CODE}}', error.code);

            return res.render('error/error', {
                error,
                debugMode: debugMode,
                title,
                bodyClass: 'page-error',
                app: config.app,
            });
        }
    });
};
