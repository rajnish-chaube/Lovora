const userAuth = (req, res, next)=>{
    console.log("User Auth Middleware");
    const token = "xyz";
    const isUserAuth = token === "xyz";
    if(!isUserAuth){
        res.status(401).send({message: "Unauthorized request"});
    }else{
        next();
    }
}
const adminAuth = (req, res, next)=>{
    console.log("Admin Auth Middleware");
    const token = "xyz";
    const isAdminAuth = token === "xyz";
    if(!isAdminAuth){
        res.status(401).send({message: "Unauthorized request"});
    }else{
        next();
    }
}