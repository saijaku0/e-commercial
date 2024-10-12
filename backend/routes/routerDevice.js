const Router = require("express");
const router = new Router();
const DeviceController = require("../controller/deviceController.js");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware.js");

router.post("/", checkRoleMiddleware("ADMIN"), DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);

module.exports = router;
