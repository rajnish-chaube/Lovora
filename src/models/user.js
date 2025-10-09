const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        validate(value){
            const genders = ["male", "female", "other"];
            if(!genders.includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    about:{
        type:String,
        default:"Hey there! I am using Lovora.",
    },
    skills:{
        type:[String],
    }
},{ timestamps:true });
module.exports = mongoose.model("User", userSchema);
//* or 
// module.exports = userSchema;
// const User =mongoose.model("User", userSchema);
// module.exports = User;