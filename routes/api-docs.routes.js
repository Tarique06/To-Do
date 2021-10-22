// const controller = require('../controller/user.controller.')
// const auth = require('../middleware/authentication')
// const router = require("express").Router();

// router.post("/addTodo", controller.create);

// router.get("/:id", auth, controller.findOne);

// router.put("/updateTodo/:id", auth, controller.update);

// router.delete("/deleteTodo/:id", auth, controller.delete);

// module.exports = router

const { Router } = require("express");
const router = Router();

const { UserController } = require("../controller");

router.post('/login', UserController.authenticate);
router.post('./register', UserController.register);

module.exports = router;



