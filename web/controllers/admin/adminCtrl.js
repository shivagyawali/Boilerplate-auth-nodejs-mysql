const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const adminCtrl = {
  dashboard:  (req, res) => {
    res.render("admin/dashboard", {
      name: req.user.name,
      user: req.user,
    });
  },
};

module.exports = adminCtrl;
