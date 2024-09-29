const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async(req,res) => {
const userObj = {
    firstName:"Prashant",
    lastName:"Shinde",
    emailId:"prashant@gmail.com",
    password:"prashant@123"
}

// Creating the new instance of the user model

const user = new User(userObj);


// All mongoose functions are retuning promises

try{
    await user.save();
    res.send("User Added Successfully");
}catch(err){
    res.status(400).send("Error Saving the user:" + err.message);
}

})

connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...");
    });
})
.catch(() => {
    console.error("Database cannot be connected");
});



// MiddleWares Code
// const {adminAuth,userAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.get("/user/login",(req,res) => {
//     res.send("Login User");
// })

// app.get("/user",userAuth,(req,res) => {
//     res.send("User Data Sent");
// })

// app.get("/admin/getAllData",(req,res) => {
//     res.send("All Data Sent");
// })

// app.get("/admin/deleteUser",(req,res) => {
//     res.send("Deleted A User");
// })
// -----MiddleWares Code End --------


// app.use("/route",rh1,[rh2,rh3],rh4,rh5);
// app.get, app.post and all other we can use;

// app.get(
//     "/user",
//     (req,res,next) => {
//         console.log("Handling the route user");
//         next();
//     },
//     (req,res,next) => {
//         console.log("Handling the route user");
//         next();
//     },
//     (req,res,next) => {
//         console.log("Handling the route user");
//         next();
//     },
//     (req,res) => {
//         console.log("Handling the route user");
//         res.send("4th Response");
//     }

// )

// app.get("/user/:userId/:name/:password", (req,res) => {
//     res.send({firstname:"Prashant",lastname:"shinde"}); 
// })

// app.get("/user", (req,res) => {
//     res.send({firstname:"Prashant",lastname:"shinde"}); 
// })

// app.post("/user", (req,res) => {
// // Saved to Db
//     res.send("Data Successfully saved to the database");
// })

// app.use("/hello/2",(req,res) => {
//     res.send("Abracadbra");
// })
// app.use("/test",(req,res) => {
//     res.send("Hello from the Test !");
// })

// app.use("/hello",(req,res) => {
//     res.send("Hello Hello Hello");
// })

// app.use("/",(req,res) => {
//     res.send("Hello from the Dashboard!");
// })

// app.listen(3000, () => {
//     console.log("Server is successfully listening on port 3000...");
// });