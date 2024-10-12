const Router = require("express");
const router = new Router();
const BrandController = require("../controller/brandCoontroller.js");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware.js");

router.post("/", checkRoleMiddleware("ADMIN"), BrandController.create);
router.get("/", BrandController.getAll);

module.exports = router;
