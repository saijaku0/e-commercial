const Router = require("express");
const router = new Router();
const UserController = require("../controller/userController.js");
const authMeddleware = require("../middleware/authMeddleware.js");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMeddleware, UserController.checkAuth);

module.exports = router;
