const mongoose = require('mongoose');
const enhanceModel = require('../utils/enhanceModel');

module.exports = (modelName, schemaOptions, options, dontEnhance) => {
    let schema = new mongoose.Schema(schemaOptions, { timestamps: true });

    // Virtual
    if (options && options.virtual) {
        for (let [key, value] of Object.entries(options.virtual)) {
            let virtual = schema.virtual(key);

            if (typeof virtual === 'function') {
                virtual.get(virtual);
            } else {
                let getter = value.get;
                typeof getter === 'function' && virtual.get(getter);

                let setter = value.set;
                typeof setter === 'function' && virtual.get(setter);
            }
        }
    }

    // Plugins
    if (options && Array.isArray(options.plugins)) {
        options.plugins.map((plugin) => {
            schema.plugin(plugin);
        });
    }

    // Index
    if (options && options.index) {
        schema.index(options.index);
    }

    const Model = mongoose.model(modelName, schema);
    return dontEnhance ? Model : enhanceModel(Model);
};