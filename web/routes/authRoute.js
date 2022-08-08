const router = require("express").Router();
const { forwardAuthenticated } = require("../config/checkAuth");
const authCtrl = require("../controllers/authCtrl");

router.get("/register", forwardAuthenticated, authCtrl.getRegister);
router.get("/login", forwardAuthenticated, authCtrl.getLogin);
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

module.exports = router;
