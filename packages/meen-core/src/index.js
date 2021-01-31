require('dotenv').config();

module.exports = {
    composeApp: require('./composeApp'),
    composeModel: require('./composeModel'),
    modules: require('./modules'),
};
