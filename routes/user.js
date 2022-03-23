const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const userValidator = require('../validations/userValidators')
const jwtToken = require("../validations/jwValidation");
router.get('/user', jwtToken.validateToken,userValidator.id, usersController.getUsers);
router.get('/users', jwtToken.validateToken, usersController.getUsers);
router.post('/user', jwtToken.validateToken,userValidator.add, usersController.postUser);
router.post('/login', userValidator.id, usersController.getLogin);
router.put('/user', jwtToken.validateToken,userValidator.update, usersController.putUser);
router.delete('/user',jwtToken.validateToken, userValidator.id, usersController.deleteUser);

module.exports = router;