module.exports = async (Model, req, itemPerPage, query, improveQueryBuild) => {
    const currentPage = +req.params.page || 1;
    let queryBuilder = Model.find(query);
    if (typeof improveQueryBuild === 'function') {
        queryBuilder = improveQueryBuild(queryBuilder);
    }

    const totalPage = await Model.countDocuments(query).then(total => Math.ceil(total / itemPerPage));
    const data = await queryBuilder.skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage);

    return {
        data,
        totalPage,
        currentPage,
    }
};
