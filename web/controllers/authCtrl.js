const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const authCtrl = {
  register: async (req, res) => {
    let errors = [];
    try {
      const { name, email, password } = req.body;
      if (!name || !password || !email) {
        errors.push({ msg: "Please enter all fields" });
      }
      if (password.length < 6) {
        errors.push({
          msg: "Password must be at least 6 characters.",
        });
      }
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (user) {
        errors.push({ msg: "This user already exists." });
      }

      if (errors.length > 0) {
        res.render("auth/register", {
          errors,
          name,
          email,
          password,
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
      req.flash("success_msg", "Account successfully registered");
      res.redirect("/auth/login");
    } catch (err) {
      errors.push({ msg: err.msg });
    }
  },
  getRegister: (req, res) => {
    res.render("auth/register");
  },
  getLogin: (req, res) => {
    res.render("auth/login", {
      page_name: "Login",
    });
  },
  login: async (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/user/dashboard",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  },
  logout: async (req, res,next) => {
     req.logout(function (err) {
       if (err) {
         return next(err);
       }
       req.flash("success_msg", "You are logged out");
       res.redirect("/auth/login");
     });
     
  },
};

module.exports = authCtrl;

// app.get("/", async (req, res) => {
//   await prisma.user
//     .findMany()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// app.get("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   await prisma.user
//     .findFirst({
//       where: { id: Number(id) },
//     })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.post("/user", async (req, res) => {
//   const { name } = req.body;
//   const user = await prisma.user.create({
//     data: {
//       name,
//     },
//   });
//   res.json(user);
// });

// app.put("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const user = await prisma.user.update({
//     where: { id: Number(id) },
//     data: { name: name },
//   });
//   res.json(user);
// });

// app.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.delete({
//     where: { id: Number(id) },
//   });
//   res.json(user);
// });
