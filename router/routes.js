const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");
const Auth = require("../Middlware/middleware");


router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/verfiy', Auth.checkAuth, userController.getverfiy);
router.post('/del', Auth.adminAuth, userController.deleteUser);
// router.put('/update/:id', Auth.checkAuth, userController.updateUser);



module.exports = router;
