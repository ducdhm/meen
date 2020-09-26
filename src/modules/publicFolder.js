// Static folder
// --------------------------------
const express = require('express');

module.exports = (app, config) => {
    const logger = app.logger('STATIC');
    const setupPublic = (publicUrl, publicFolderPath) => {
        app.use(
            publicUrl,
            express.static(
                publicFolderPath,
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

    if (typeof config.publicFolder.path === 'string') {
        setupPublic('/public', config.publicFolder.path);
    } else {
        for (let url in config.publicFolder.path) {
            setupPublic(url, config.publicFolder.path[url]);
        }
    }
};
