const path = require('path');
const fs = require('fs');
const makeDir = require('make-dir');
const { logger, genContent } = require('../utils');
const CURRENT_FOLDER = process.cwd();

module.exports = (name, template, initMethod) => {
    let result = true;

    const absolutePath = path.join(CURRENT_FOLDER, name);
    logger.info(`Ensure "${absolutePath}" does exit`);

    if (!fs.existsSync(absolutePath)) {
        result = false;

        if (typeof initMethod === 'function') {
            initMethod(absolutePath);
        } else if (template) {
            fs.writeFileSync(
                absolutePath,
                genContent(path.join(__dirname, 'template', template)),
            );
        } else {
            makeDir(absolutePath);
        }
    }

    return result;
};
