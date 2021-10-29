const controller = require("../controller");
const auth = require('../Authentication/JwtAuthentication')
const tasks = require("express").Router();
const isAdmin = require('../Authentication/permission')

tasks.post("/", auth, isAdmin, controller.controller.create);

tasks.get("/fetch", auth, controller.controller.findAll);

tasks.get("/:id", auth, controller.controller.findOne);

tasks.put("/update/:id", auth, isAdmin, controller.controller.update);

tasks.delete("/:id", auth, isAdmin, controller.controller.delete);

tasks.get("/completed", auth, controller.controller.findAllPublished);

module.exports = tasks