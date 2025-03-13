const express = require('express');

const {userRouter} = require('./authRoutes.js');
const {authRoutes} = require('./userRoutes.js');
const {doctorRouter} = require('./doctorRoute.js')
const router = express.Router();


router.use('/user',userRouter);
router.use("/user", authRoutes);
router.use("/doctor", doctorRouter);
module.exports = { apiRouter: router };

