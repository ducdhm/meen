module.exports = (url, ignoreQueryList = []) => (req, res, next) => {
    let queryString = '';
    for (let name in req.query) {
        if (!ignoreQueryList.includes(name) && req.query.hasOwnProperty(name)) {
            queryString += `${name}=${req.query[name]}`;
        }
    }

    res.redirect(301, `${url}${queryString ? '?' + queryString : ''}`);
};
