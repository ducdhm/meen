// Compress all requests
// --------------------------------
const compression = require('src/modules/compression');
module.exports = (app) => {
    app.use(compression());
};
