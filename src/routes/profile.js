const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const {validateEditProfileData} = require("../utils/validation");



// middleware always in middle if everything goes well then only next() will get executed /profile will be called
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }


    // res.send("reading cookies");
    // try{

    // }catch(err){

    // }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res) => {
    try{
        if(!validateEditProfileData(req)){
          throw new Error("Invalid Edit Request");
        }

        const loggedInUser =   req.user;

        Object.keys(req.body).forEach((key ) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName}, your profile updated successfully`,
            data:loggedInUser
        })
      }catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = profileRouter;
