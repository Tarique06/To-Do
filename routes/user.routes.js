const { Router } = require("express");
const router = Router();
const { UserController } = require("../controller");

router.post('/login', UserController.authenticate);
router.post('/register', UserController.register);
router.post('/logout', UserController.logout);
router.post('/add_roles', UserController.addRoles);

module.exports = router;



