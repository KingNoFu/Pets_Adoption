const express = require("express");
const router = express.Router();
const petsController = require('../controllers/petsController');
const petValidator = require("../validations/petValidation")
const jwtToken = require("../validations/jwValidation");
router.get('/pet', jwtToken.validateToken,petValidator.id, petsController.getPet);
router.get('/pets', jwtToken.validateToken,petsController.getPets);
router.post('/pet', jwtToken.validateToken,petValidator.add, petsController.postPet);
router.post('/login', petValidator.id, petsController.getLogin);
router.put('/pet', jwtToken.validateToken,petValidator.update, petsController.putPet);
router.delete('/pet', jwtToken.validateToken,petValidator.id, petsController.deletePet);

module.exports = router;
/* 
router.get('/user', jwtToken.validateToken,userValidator.id, usersController.getUsers);
router.get('/users', jwtToken.validateToken, usersController.getUsers);
router.post('/user', jwtToken.validateToken,userValidator.add, usersController.postUser);
router.post('/login', userValidator.id, usersController.getLogin);
router.put('/user', jwtToken.validateToken,userValidator.update, usersController.putUser);
router.delete('/user',jwtToken.validateToken, userValidator.id, usersController.deleteUser);
*/ 