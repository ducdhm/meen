const { newError } = require('@meenjs/utils');

module.exports = (app, permission) => async (req, res, next) => {
    let { role, LOCALE } = app;
    let userPermission = role[req.user.role];

    if (req.user.god) {
        return next();
    }

    if (userPermission.indexOf(permission) === -1) {
        return next(newError(403, LOCALE.PAGE_ERROR__ERROR_403));
    }

    next();
};
