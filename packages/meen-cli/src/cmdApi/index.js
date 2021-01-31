module.exports = (program) => {
    program
        .command('api <name>')
        .description('create an API app')
        .action(require('./initApi'));
};
