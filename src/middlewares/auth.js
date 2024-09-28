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

const userAuth = (req,res,next) => {
    console.log("User Auth Is Getting Checked");
    const token = "xyzccc";
    const isAdmimAuthorized = token === "xyz";

    if(!isAdmimAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,userAuth
}