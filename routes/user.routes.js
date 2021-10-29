const { Router } = require("express");
const router = Router();
const { UserController } = require("../controller");
const auth = require('../Authentication/JwtAuthentication')

router.post('/login', UserController.authenticate);
router.post('/register/admin', UserController.adminRegister);
router.post('/register', UserController.register);
router.post('/logout', UserController.logout);
router.delete('/delete/:id', auth, UserController.delete);
router.put('/update/:id', auth, UserController.update);


module.exports = router;
