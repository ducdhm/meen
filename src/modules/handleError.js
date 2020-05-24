const { newError } = require('@meenjs/utils');

module.exports = (app, config) => {
    const logger = app.logger('ERROR');

    app.use((req, res, next) => {
        next(newError(404));
    });

    app.use((error, req, res, next) => {
        error.code = error.code || 500;

        // Normalize message for common error code
        let message = error.message;
        switch (error.code) {
            case 404:
                message = message || config.handleError.locale.error404;
                break;

            case 500:
                message = message || config.handleError.locale.error500;
                break;

            default:
                message = message || config.handleError.locale.error500;
        }

        // Add this line to include winston logging
        logger.error(`${error.code} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);

        let debugMode = false;
        if (req.query.hasOwnProperty('debug')) {
            debugMode = true;
        }
        if (config.handleError.debug) {
            debugMode = true;
        }

        // Add stack error when debugging
        const stackError = {};
        if (debugMode) {
            stackError.stack = error.stack.split('\n');
        }

        if (config.handleError.isJson || req.returnJson) {
            let json = {
                status: false,
                code: error.code,
                message: message,
                error: {
                    ...error,
                    ...stackError,
                },
            };

            return res.json(json);
        } else {
            let title = config.handleError.locale.title;
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
