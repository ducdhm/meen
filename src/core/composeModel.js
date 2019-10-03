const mongoose = require('mongoose');
const getConfig = require('./_getConfig');
const enhanceModel = require('../utils/enhanceModel');

module.exports = (modelName, schema, options, dontEnhance) => {
    const modelConfig = getConfig();
    
    let modelSchema = new mongoose.Schema(schema, { timestamps: true });

    // Virtual
    if (options && options.virtual) {
        for (let [key, value] of Object.entries(options.virtual)) {
            let virtual = modelSchema.virtual(key);

            if (typeof value === 'function') {
                virtual.get(value);
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
            modelSchema.plugin(plugin);
        });
    }

    // Index
    if (options && options.index) {
        modelSchema.index(options.index);
    }

    // Set
    if (options && options.set) {
        for (let [key, value] of Object.entries(options.set)) {
            modelSchema.set(key, value);
        }
    }

    const Model = mongoose.model(modelName, modelSchema);
    return dontEnhance ? Model : enhanceModel(Model, modelConfig.mongoose.itemPerPage);
};