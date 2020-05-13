const { toKebabCase } = require('@meenjs/utils');

module.exports = (modelName, modelSchema) => {
    const url = toKebabCase(modelName);

    modelSchema.virtual('url').get(function () {
        return `/${url}/${this._id}`;
    });
};
