const { getFileList, resolvePath } = require('@meenjs/utils');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const fileList = getFileList(resolvePath('src', 'modules')).map(item => path.parse(item).name).filter(item => item !== 'index');
const template = fs.readFileSync( resolvePath('tools', 'genModuleIndex', 'index.hbs'), 'utf8');
const content = Handlebars.compile(template)({
    utils: fileList,
});

fs.writeFileSync(resolvePath('src', 'modules', 'index.js'), content);
