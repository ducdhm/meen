const CURRENT_FOLDER = process.cwd();
const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const logger = require('@meenjs/utils').getLogger();
const genContent = require('./genContent')

const createFolder = (rootFolder, data, fileData) => {
    logger.info(`-> Create "${rootFolder}"`);
    makeDir(rootFolder);

    for (let name in data) {
        const childPath = path.join(rootFolder, name);

        if (typeof data[name] === 'string') {
            if (fs.existsSync(childPath)) {
                logger.info(`-> Update "${childPath}"`);
            } else {
                logger.info(`-> Create "${childPath}"`);
            }
            fs.writeFileSync(
                childPath,
                genContent(data[name], fileData),
            )
        } else {
            createFolder(childPath, data[name], fileData)
        }
    }
};

module.exports = (folderName, structure, fileData, checkExisting) => {
    const folderPath = path.join(CURRENT_FOLDER, folderName);

    if (checkExisting && fs.existsSync(folderPath)) {
        logger.warn(`-> "${folderPath}" does exist". Skip initializing structure`);
        return;
    }

    createFolder(folderPath, structure, fileData);
};
