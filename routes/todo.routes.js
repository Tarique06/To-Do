const controller = require('../controller/todo.controller')
const router = require("express").Router();

router.post("/addTodo", controller.create);

router.get("/:id", controller.findOne);

router.put("/updateTodo/:id", controller.update);

router.delete("/deleteTodo/:id", controller.delete);

module.exports = router