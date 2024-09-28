const express = require("express");

const app = express();

// MiddleWares Code
const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user/login",(req,res) => {
    res.send("Login User");
})

app.get("/user",userAuth,(req,res) => {
    res.send("User Data Sent");
})

app.get("/admin/getAllData",(req,res) => {
    res.send("All Data Sent");
})

app.get("/admin/deleteUser",(req,res) => {
    res.send("Deleted A User");
})
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

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});