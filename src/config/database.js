const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://rajnishchaube002:Rajnish@raj290.eo1fsig.mongodb.net/Lovora"
    );
};

connectDB()
    .then(()=>{
        console.log("Connected to database Lovora");
    })
    .catch((err)=>{
        console.error("error! did not connect to database");
    });

module.exports = connectDB;