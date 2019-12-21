// Static folder
// --------------------------------
const express = require('express');
const path = require('path');

module.exports = (app, config) => {
    const log = app.logger('STATIC');

    app.use(
        '/public',
        express.static(
            config.publicFolder.path,
            config.publicFolder.debug ? {
                index: false,
                setHeaders: (response, filePath) => {
                    // Logging work
                    log.debug(`Serve "${response.req.originalUrl}" from "${filePath}"`);
                },
            } : null,
        ),
    );
};
