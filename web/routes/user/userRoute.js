const router = require("express").Router();
const {  auth,  } = require("../../config/checkAuth");
const userCtrl = require("../../controllers/user/userCtrl");

router.get("/dashboard",  auth,  userCtrl.dashboard);


module.exports = router;
