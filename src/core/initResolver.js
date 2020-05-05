const { ObjectId } = require('mongoose').Types;
const newError = require('./newError');

module.exports = (Model, propName, handler) => async (req, res, next) => {
    const id = req.params.id;
    let record = null;

    if (ObjectId.isValid(id)) {
        if (typeof handler === 'function') {
            record = await handler(req);
        } else {
            record = await Model.findById(id);
        }
    }

    if (id === 'new') {
        record = new Model();
    }

    if (record === null) {
        return next(newError(404));
    }

    req[propName] = record;
    next();
};
