const mongoose = require('mongoose');
require("dotenv").config();


const connectDB = async () => {
    try{
        const connect = await mongoose.connect(
            process.env.CONNECT_URL
        );
        console.log('mongoose connected');
        
    } catch (error){
        console.error(error);
        process.exit(1);
    }
    
};

module.exports = connectDB