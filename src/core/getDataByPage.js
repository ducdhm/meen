module.exports = async (Model, query, page, itemPerPage) => {
    if (typeof itemPerPage === 'undefined') {
        itemPerPage = page;
        page = query;
        query = {};
    }

    const totalPage = await Model.countDocuments(query).then(total => Math.ceil(total / itemPerPage));
    const data = await Model.find(query).skip((itemPerPage * page) - itemPerPage).limit(itemPerPage);

    return {
        data,
        totalPage,
    }
};
