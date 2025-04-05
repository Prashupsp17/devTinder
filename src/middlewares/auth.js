const jwt = require("jsonwebtoken");
const User = require("../models/user");


const adminAuth = (req,res,next) => {
    console.log("Admin Auth Is Getting Checked");
    const token = "xyz";
    const isAdmimAuthorized = token === "xyz";

    if(!isAdmimAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

const userAuth = async (req,res,next) => {
    try{

        const {token} = req.cookies;

        if(!token){
            return res.status(401).send("Please Login! ");
            // throw new Error("Token is not valid!!!!");
        }

        const decodedObj = await jwt.verify(token,"prashant")


        const {_id} = decodedObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        }

        req.user = user;
        next();

    }catch(err){
        res.status(400).send("ERROR" +err.message);
    }
}

// const userAuth = (req,res,next) => {
//     console.log("User Auth Is Getting Checked");
//     const token = "xyzccc";
//     const isAdmimAuthorized = token === "xyz";

//     if(!isAdmimAuthorized){
//         res.status(401).send("Unauthorized request");
//     }else{
//         next();
//     }
// }

module.exports = {
    adminAuth,userAuth
}