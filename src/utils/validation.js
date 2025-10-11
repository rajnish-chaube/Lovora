const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName || !emailId || !password){
        throw new Error("All fields are required:");
    }
    else if( firstName.length < 3 || lastName.length < 3 ){
        throw new Error("Please provide name details:");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please provide valid emailId:");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please provide strong password:");
    }
    else if( password.length < 6){
        throw new Error("Password must be at least 6 characters long:");
    }
    else{
        return true;
    }

};
module.exports = validateSignUpData;
