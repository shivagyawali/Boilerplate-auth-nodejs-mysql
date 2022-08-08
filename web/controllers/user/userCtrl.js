const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authCtrl = {
  dashboard: async (req, res) => {
    if (req.user.isAdmin) {
      res.redirect("/admin/dashboard");
    } else {
      res.render("user/dashboard", {
        name: req.user.name,
        user: req.user,
      });
    }
  },
};

module.exports = authCtrl;
