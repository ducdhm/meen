module.exports = (app) => (req, res, next) => {
    req.returnJsonError = true;
    next();
};
