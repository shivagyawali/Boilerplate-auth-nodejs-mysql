const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;
require("./web/config/passport")(passport);
const globalCtrl = require("./web/controllers/globalCtrl")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//check if the database is connected
prisma
  .$connect()
  .then((response) => {
    console.log("Connected to the mysql database..!");
  })
  .catch((error) => {
    console.error("Failed to connect to the database.", error);
  });

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.use("/assets", express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/web/views"));
app.use(express.urlencoded({ extended: false }));
//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

//middleware passport
app.use(passport.initialize());
app.use(passport.session());
//flash msg
app.use(flash());

//------------ Global variables ------------//
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use(globalCtrl);

app.get("/", (req, res) => {
 
    res.render("frontend/welcome");
 
});
app.use("/auth", require("./web/routes/authRoute"));
app.use("/user", require("./web/routes/user/userRoute"));
app.use("/admin", require("./web/routes/admin/adminRoute"));



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
