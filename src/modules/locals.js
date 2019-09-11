const edge = require('edge.js');

module.exports = (app, config) => {
    app.use((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
            edge.global('currentUser', req.user);
            edge.global('formatter', require('../utils/formatter'));
            
            let isIframeMode = req.query.hasOwnProperty('iframe');
            edge.global('isIframeMode', isIframeMode);
            
            edge.global('layoutName', `layout/${app.id}Layout`);
            
            typeof config.locals === 'function' && config.locals.call(null, edge, req);
        }
        
        return next();
    });
};