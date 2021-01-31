const { printAppFooter } = require('../utils/');
const path = require('path');
const fs = require('fs');
const { logger } = require('../utils');
const CURRENT_FOLDER = process.cwd();
const { execSync } = require('child_process');

module.exports = (name) => {
    logger.info(`Add script for developing "${name}" to "package.json"`);
    const packagePath = path.join(CURRENT_FOLDER, 'package.json');
    const packageData = require(packagePath);
    packageData['scripts'][name] = `nodemon ${name}/index.js`;
    fs.writeFileSync(packagePath, JSON.stringify(packageData, ' ', 4));

    logger.info(`Install dependencies from "package.json"`);
    execSync('npm install', {
        stdio: 'ignore'
    });

    printAppFooter(name);
};
