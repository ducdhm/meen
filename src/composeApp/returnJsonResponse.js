module.exports = (req, res, next) => {
    req.returnJson = true;
    next();
};
