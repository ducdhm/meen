module.exports = (url, ...others) => {
    app.post(
        url,
        (req, res, next) => {
            req.returnJson = true;
            next();
        },
        ...others,
    )
};
