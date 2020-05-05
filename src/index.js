require('dotenv').config();

module.exports = {
    composeApp: require('./core/composeApp'),
    composeModel: require('./core/composeModel'),
    buildMenu: require('./core/buildMenu'),
    getDataByPage: require('./core/getDataByPage'),
    initResolver: require('./core/initResolver'),
    modules: require('./modules'),
};
