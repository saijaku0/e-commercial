const Router = require("express");
const router = new Router();
const routerDevice = require("./routerDevice.js");
const routerBrand = require("./routerBrand.js");
const routerType = require("./routerType.js");
const routerUser = require("./routerUser.js");

router.use("/user", routerUser);
router.use("/type", routerType);
router.use("/brand", routerBrand);
router.use("/device", routerDevice);

module.exports = router;
