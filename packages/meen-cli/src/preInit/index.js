const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ensureExist = require('./ensureExist');
const { logger } = require('../utils');
const CURRENT_FOLDER = process.cwd();

module.exports = (name) => {
    if (ensureExist('package.json', null, () => execSync(`npm init -y`))) {
        logger.warn('-> "package.json" does exist. Skip initializing default "package.json"');
    }

    const packagePath = path.join(CURRENT_FOLDER, 'package.json');
    const packageData = require(packagePath);

    ensureExist('@local');

    if (!ensureExist('@local/config')) {
        ensureExist('@local/config/app.js', 'config.app.hbs');
    } else {
        logger.warn('-> "@local/config" does exist. Skip initializing default "@local/config"');
    }

    if (!ensureExist('@local/models')) {
        ensureExist('@local/models/index.js', 'model.index.hbs');
        ensureExist('@local/models/README.md', 'model.readme.hbs');
        ensureExist('@local/models/package.json', 'model.package.json.hbs');
        ensureExist('@local/models/User');
        ensureExist('@local/models/User/role.js', 'model.user.role.hbs');
        ensureExist('@local/models/User/index.js', 'model.user.index.hbs');

        packageData['dependencies'] = {
            ...packageData['dependencies'],
            '@local/models': 'file:@local/models',
        };
    } else {
        logger.warn('-> "@local/models" does exist. Skip initializing default "@local/models"');
    }

    if (!ensureExist('@local/locale')) {
        ensureExist('@local/locale/README.md', 'locale.readme.hbs');
        ensureExist('@local/locale/package.json', 'locale.package.json.hbs');
        ensureExist('@local/locale/en.js', 'locale.en.hbs');
        ensureExist('@local/locale/vi.js', 'locale.vi.hbs');

        packageData['dependencies'] = {
            ...packageData['dependencies'],
            '@local/locale': 'file:@local/locale',
        };
    } else {
        logger.warn('-> "@local/locale" does exist. Skip initializing default "@local/locale"');
    }

    packageData['dependencies'] = {
        ...packageData['dependencies'],
        '@meenjs/core': '^1.6.1',
        '@dudojs/utils': '^1.2.6',
        'basic-auth': '^2.0.1',
        'bcryptjs': '^2.4.3',
        'connect-ensure-login': '^0.1.1',
        'edge.js': '^1.1.4',
        'jsonwebtoken': '^8.4.0',
        'mongoose-unique-validator': '^2.0.3',
        'nodemon': '^1.18.4',
        'passport': '^0.4.1',
        'passport-local': '^1.0.0'
    };

    logger.info('Update "package.json"');
    fs.writeFileSync(packagePath, JSON.stringify(packageData, ' ', 4));
};
