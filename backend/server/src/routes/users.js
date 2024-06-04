var express = require('express');
var router = express.Router();
const userController = require("../api/controllers/UserController")
const {adminAuth, userAuth} = require("../service/auth.token.js");

/* GET home page. */
// Định nghĩa các route
router.get('/profile', userAuth, userController.getUserProfile);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;
