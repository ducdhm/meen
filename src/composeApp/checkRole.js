module.exports = (req, roleList) => {
    if (req.user.god) {
        return true;
    }

    return roleList.indexOf(req.user.role) !== -1;
};
