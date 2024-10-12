const Router = require("express");
const router = new Router();
const TypeController = require("../controller/typeController.js");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware.js");

router.post("/", checkRoleMiddleware("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);

module.exports = router;
