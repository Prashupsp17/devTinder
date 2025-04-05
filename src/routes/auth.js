const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const bcyrpt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
    // Validation of data

    // const user = new User(req.body);



    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcyrpt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        })
       const savedUser =  await user.save();
       const token = await savedUser.getJWT();
       res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000)
       });

   
        res.json({message:"User Added Successfully!" , data:savedUser});
    } catch (err) {
        res.status(400).send("Error Saving the user:" + err.message);
    }

})

authRouter.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJWT();
            res.cookie("token", token);
            res.send(user);
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

authRouter.post("/logout",async(req,res) => {
    res.cookie("token", null,{
        expires:new Date(Date.now()),
    }),
    res.send("Logout Successful!!");
})
module.exports = authRouter;