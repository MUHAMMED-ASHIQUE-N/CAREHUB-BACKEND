const express = require('express');

const {userRouter} = require('./authRoutes.js');
const {authRoutes} = require('./userRoutes.js');

const router = express.Router();


router.use('/user',userRouter);
router.use("/user", authRoutes);


module.exports = { apiRouter: router };