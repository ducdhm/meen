module.exports = (program) => {
    program
        .command('web <name>')
        .description('create a Web app')
        .action(require('./initWeb'));
};
