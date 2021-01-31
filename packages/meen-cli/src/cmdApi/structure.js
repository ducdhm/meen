const path = require('path');

module.exports = {
    'index.js': path.join(__dirname, './template/index.hbs'),
    'auth': {
        'jwt.js': path.join(__dirname, './template/auth.jwt.hbs'),
    },
    'module': {
        'ping': {
            'index.js': path.join(__dirname, './template/module.ping.index.hbs'),
            'ping.controller.js': path.join(__dirname, './template/module.ping.controller.hbs'),
            'ping.route.js': path.join(__dirname, './template/module.ping.route.hbs'),
        },
        'user': {
            'index.js': path.join(__dirname, './template/module.user.index.hbs'),
            'user.controller.js': path.join(__dirname, './template/module.user.controller.hbs'),
            'user.route.js': path.join(__dirname, './template/module.user.route.hbs'),
        },
    }
};
