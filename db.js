const mongoose = require('mongoose');
require("dotenv").config();


const connectDB = async () => {
    try{
        const connection = await mongoose.connect(
            process.env.CONNECT_URL
        );
        console.log('mongoose connected');
        
    } catch (error){
        console.error(error);
        
    }
    
};

module.exports = connectDB