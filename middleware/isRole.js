const isRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
        return next();
        } else {
        res.render('access-denied');
        }
    };
};

module.exports = isRole;