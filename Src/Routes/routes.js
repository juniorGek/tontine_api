const express = require('express');
const AuthController = require('../Controllers/AuthController');
const authMiddleware = require('../Middlewares/authMiddleware.JS');
const AgentAuthController = require('../Controllers/AgentAuthController');
const Categorie = require('../Controllers/Categorie');
const Clients = require('../Controllers/Client');
const router = express.Router();
require("dotenv").config();


router.get('/', (req, res) => {
    res.send('Bonjour tout le monde');
});


router.post('/register',authMiddleware, AuthController.register)
router.post('/login', AuthController.login)

router.get('/user',authMiddleware,AuthController.user)

router.post('/agentRegister',authMiddleware ,AgentAuthController.AgentRegister)

router.get('/agent/liste',authMiddleware,AgentAuthController.listeAgent);
router.get('/agent/listeAgent',authMiddleware,AgentAuthController.listeAgentAssigned);
router.get('/agent/details/:id',authMiddleware,AgentAuthController.detailsAgent)

router.post('/addCompte',authMiddleware,Categorie.addCategorie);
router.get('/compte/liste',Categorie.getAllCategories);

router.post('/addClient',authMiddleware,Clients.addClient);
router.post('/registerClient',Clients.clientRegister);
router.get('/awaitClient',authMiddleware,Clients.waitList);
router.get('/waitclient/details/:id',authMiddleware,Clients.detailWaitClient)


module.exports = router;