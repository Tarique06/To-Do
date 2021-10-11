const controller = require('../controller/auth.controller');
const requireAuth = require('../middleware/authentication')
const auth = require('express').Router();

auth.post('/login', controller.login)
auth.post('/logout', requireAuth, controller.logout)

module.exports = auth