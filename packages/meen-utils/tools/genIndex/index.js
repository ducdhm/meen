const getFileList = require('../../src/getFileList');
const resolvePath = require('../../src/resolvePath');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const fileList = getFileList(resolvePath('src')).map(file => path.parse(file).name);
const template = fs.readFileSync(resolvePath('tools', 'genIndex', 'index.hbs'), 'utf8');
const content = Handlebars.compile(template)({
    utils: fileList
});

fs.writeFileSync(resolvePath('index.js'), content);
