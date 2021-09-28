const controller = require('../controller/todo.controller')
const router = require("express").Router();

router.post("/", controller.create);

router.get("/:id", controller.findOne);

module.exports = router