const express = require('express');

const {userRouter} = require('./authRoutes.js');
const {authRoutes} = require('./userRoutes.js');
const {adminRouter} = require('./adminRoute.js')
const router = express.Router();


router.use('/user',userRouter);
router.use("/user", authRoutes);
router.use("/admin", adminRouter);
module.exports = { apiRouter: router };

