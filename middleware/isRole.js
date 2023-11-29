const isRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      // res.render("access-denied");
      res.status(404).send("Access denied, this page can't access");
    }
  };
};

module.exports = isRole;
