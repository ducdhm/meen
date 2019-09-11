// View config
// --------------------------------
const resolvePath = require('../utils/resolvePath');
const {config: edgeConfig, engine} = require('express-edge');
module.exports = (app, config) => {
    app.use(engine);
    app.set('views', resolvePath(app.id, 'views'));

    // View cache for production
    edgeConfig({cache: config.view.cache});
};
