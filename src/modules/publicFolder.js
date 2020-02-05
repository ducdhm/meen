// Static folder
// --------------------------------
const express = require('express');

module.exports = (app, config) => {
    const logger = app.logger('STATIC');

    app.use(
        '/public',
        express.static(
            config.publicFolder.path,
            config.publicFolder.debug ? {
                index: false,
                setHeaders: (response, filePath) => {
                    // Logging work
                    logger.debug(`Serve "${response.req.originalUrl}" from "${filePath}"`);
                },
            } : null,
        ),
    );
};
