const express = require("express");
const router = express.Router();
const adoptionsController = require('../controllers/adoptionsController');
const adoptionValidation = require("../validations/adoptionValidation");
const adopValidator = require("../validations/adoptionValidation")
const jwtToken = require("../validations/jwValidation");
router.get('/adoption', jwtToken.validateToken,adopValidator.id, adoptionsController.getAdoption);
router.get('/adoptions', jwtToken.validateToken,adoptionsController.getAdoption);
router.post('/adoption',jwtToken.validateToken, adoptionValidation.add, adoptionsController.postAdoption);
router.put('/adoption', adoptionValidation.update, adoptionsController.putAdoption);
router.post('/login', adopValidator.id, adoptionsController.getLogin);
router.delete('/adoption', jwtToken.validateToken,adoptionValidation.id, adoptionsController.deleteAdoption);
//router.get('/adoptionUser', adoptionsController.getAdoptionByUser);

module.exports = router;
/* 
router.get('/user', jwtToken.validateToken,userValidator.id, usersController.getUsers);
router.get('/users', jwtToken.validateToken, usersController.getUsers);
router.post('/user', jwtToken.validateToken,userValidator.add, usersController.postUser);
router.post('/login', userValidator.id, usersController.getLogin);
router.put('/user', jwtToken.validateToken,userValidator.update, usersController.putUser);
router.delete('/user',jwtToken.validateToken, userValidator.id, usersController.deleteUser);
*/ 