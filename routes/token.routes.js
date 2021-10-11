const Token = require('../controller/token.controller')
var tokenRoutes = require("express").Router();

tokenRoutes.post("/", Token.findAll);

module.exports = tokenRoutes