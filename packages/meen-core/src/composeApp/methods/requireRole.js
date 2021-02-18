const { newError } = require('@meenjs/utils');
const checkRole = require('./checkRole');

module.exports = (roleList) => async (req, res, next) => {
    if (!checkRole(req, roleList)) {
        return next(newError(403, LOCALE.PAGE_ERROR__ERROR_403));
    }

    next();
};
