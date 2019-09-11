// CORS setup
// --------------------------------
const cors = require('src/modules/cors');
module.exports = (app, config) => {
    app.use(
        cors(config.cors)
    );
};
