const router = require("express").Router();
const {  auth, isAdmin,  } = require("../../config/checkAuth");
const adminCtrl = require("../../controllers/admin/adminCtrl");

router.get("/dashboard",  auth,isAdmin, adminCtrl.dashboard);

module.exports = router;
