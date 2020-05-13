module.exports = (url, ...others) => {
    const isEndSlash = /\?[^]*\//.test(url);
    const urlWithoutEndSlash = isEndSlash ? url.slice(0, -1) : url;
    const urlWithEndSlash = isEndSlash ? url : url + '/';

    app.get(
        urlWithoutEndSlash,
        (req, res, next) => res.redirect(301, urlWithEndSlash),
    )

    app.get(
        urlWithEndSlash,
        ...others,
    )
};
