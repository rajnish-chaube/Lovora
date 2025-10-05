console.log("Hello World");

const express = require("express");
const app = express();

app.listen(3000);

app.use("/",(req, res)=>{
    res.send("Hello from Express js");
});
app.listen(777, ()=>{
    console.log("Server is running on port 3000");
});