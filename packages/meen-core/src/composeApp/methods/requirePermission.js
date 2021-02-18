const { newError } = require('@meenjs/utils');
const checkPermission = require('./checkPermission');

module.exports = (app, permission) => async (req, res, next) => {
    if (!checkPermission(app, req, permission)) {
        return next(newError(403, LOCALE.PAGE_ERROR__ERROR_403));
    }

    next();
};
