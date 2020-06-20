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
                error.message = error.message || config.handleError.locale.error404;
                break;

            case 500:
                error.message = error.message || config.handleError.locale.error500;
                break;

            default:
                error.message = error.message || config.handleError.locale.error500;
        }

        // Add this line to include winston logging
        logger.error(`${error.code} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);

        let debugMode = false;
        const stackError = {};
        if (config.handleError.debug) {
            debugMode = true;
            // Add stack error when debug ON
            stackError.stack = error.stack.split('\n');
        } else {
            // Remove stack error when debug OFF
            delete error.stack;
        }

        if (config.handleError.isJson || req.xhr) {
            if (req.headers['content-type'].indexOf('multipart/form-data;') !== -1) {
                // Support Dropzone
                return res.status(error.code).json(error.message);
            } else {
                return res.json({
                    status: false,
                    code: error.code,
                    message: error.message,
                    error: {
                        ...error,
                        ...stackError,
                    },
                });
            }
        } else {
            let title = config.handleError.locale.title;
            title = title.replace('{{ERROR_CODE}}', error.code);

            return res.render('error/error', {
                error,
                debugMode,
                title,
                bodyClass: 'page-error',
                app: config.app,
            });
        }
    });
};
