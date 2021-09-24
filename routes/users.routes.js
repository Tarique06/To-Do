const controller = require('../controller/users.controller')
const router = require("express").Router();

router.post("/", controller.create);

module.exports = router