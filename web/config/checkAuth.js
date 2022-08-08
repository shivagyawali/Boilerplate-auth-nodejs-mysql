module.exports = {
  auth: function (req, res, next) {
    let errors = [];
    if (req.isAuthenticated() ) {
      return next();
    }
    errors.push("Please log in to view that resource");
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/dashboard");
  },
  isAdmin: function (req, res, next) {
    let errors = [];
    if (req.isAuthenticated() && req.user.isAdmin===true) {
      return next();
    }
    errors.push("Please log in to view that resource");
    res.redirect("/user/dashboard");
  },
};
