const express = require('express');
const { register, login} = require("../controllers/userControllers");


const router = express.Router();


//Register
router.post('/register',register);
router.post('/login',login);


module.exports = { userRouter: router };