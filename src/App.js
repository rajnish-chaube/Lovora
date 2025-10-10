// const express = require("express");
// const app = express();
/**
// app.listen(3000);
** Season-2 Lec-1,2,3 -------------------------------------------------------------------------------------------
//! This will match all the HTTP methods(GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD) API for /test
app.use("/hello/2",(req, res)=>{
    res.send("Hello/2 from Express js");
});
app.use("/hello",(req, res)=>{
    res.send("Hello from Express js");                 
});
app.use("/test",(req, res)=>{
    res.send("test from Express js");
});
app.use("/",(req, res)=>{
    res.send("/ from Express js");
});
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
** Season-2 Lec-4 -------------------------------------------------------------------------------------------
//? This will only handle one call(which is taken) to /user/
//? "/a?b" is string, we can write regex also.
app.post("/user", (req, res) => {res.send("User post route")});
app.use("/user", (req, res) => {res.send("User use route")});
app.delete("/user", (req, res) => {res.send("User delete route")});

app.listen(777, ()=>{
    console.log("Server is running on port 3000");
});
** Season-2 Lec-5 -------------------------------------------------------------------------------------------
//? creating multiple request handlers for a route
app.use(
    "/user", 
    (req, res, next)=>{
        console.log("req-1 from Express console1");
        res.send("req-1 ");
        console.log("req-1 from Express js");
        next(); //! to call the next middleware function otherwise it will call only the first one.
    },
    (req, res, next)=>{ 
        console.log("req-2 from Express console1");
        res.send("req-2 ");
        console.log("req-2 from Express js");
        next(); 
    },
    (req, res, next)=>{
        console.log("req-3 from Express console2");
        res.send("req-3 ");
        console.log("req-3 from Express js");
        // next(); 
    }
); 
app.listen(777, ()=>{
    console.log("Server is running on port 777");
});
*? -------------------------------------------------------------------------
const{userAuth, adminAuth} = require("./middlewares/Auth");
// app.use("admin", adminAuth);
// app.use("user", userAuth);

app.get("/user", userAuth,  (req, res)=>{
    res.send("User data sending");
});
app.get("/admin",adminAuth, (req, res)=>{
    res.send("Admin data sending");
});

app.listen(777, ()=>{
    console.log("Server is running on port 777");
});


** Season-2 Lec-6 -------------------------------------------------------------------------------------------
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // (optional, if you’ll parse JSON later)

app.post("/signup", async (req, res) => {
    try {
        // ✅ Create a new user instance correctly
        const newUser = new User({
            firstName: "Rajnish",
            lastName: "Chaube",
            emailId: "rajnish@gmail.com",
            password: "raj290",
            age: 22,
            gender: "male"
        });

        await newUser.save();
        res.send("User signed up successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(777, () => {
            console.log("Server is running on port 777");
        });
    })
    .catch((err) => {
        console.log("Database connection failed");
        console.log(err);
    });

// app.listen(777, ()=>{
//     console.log("Server is running on port 777");
// });
** Season-2 Lec-7 -------------------------------------------------------------------------------------------
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // (optional, if you’ll parse JSON later)

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User signed up successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user" + err.message);
    }
});
//Get user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.query.emailId;
    try {
        const user = await User.findOne({emailId: userEmail});
        // if(user.length === 0){
            //     res.status(404).send("User not found");
            // } else {
                res.send(user,"User found");
                // }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
});

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
});

connectDB()
.then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
})
.catch((err) => {
    console.log("Database connection failed");
        console.log(err);
    });
** Season-2 Lec-8 -------------------------------------------------------------------------------------------
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); 

//? update validation
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    
    try{    
        const ALLOWED_UPDATES = ["userId", "age", "gender", "photoUrl", "about"];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
    
        if(!isUpdateAllowed){
            return res.status(400).send("Invalid updates! You can only update "+ ALLOWED_UPDATES);
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{ReturnDocument:"after", runValidators:true});
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user"+ err.message);
    }
});

connectDB()
    .then(() => {
        app.listen(7777, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.log("Database connection failed");
        console.log(err);
    });

** Season-2 Lec-9 -------------------------------------------------------------------------------------------
*/

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); 

//? update validation
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{    
        const ALLOWED_UPDATES = ["userId", "age", "gender", "photoUrl", "about"];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
    
        if(!isUpdateAllowed){
            return res.status(400).send("Invalid updates! You can only update "+ ALLOWED_UPDATES);
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{ReturnDocument:"after", runValidators:true});
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user"+ err.message);
    }
});

connectDB()
    .then(() => {
        app.listen(7777, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.log("Database connection failed");
        console.log(err);
    });