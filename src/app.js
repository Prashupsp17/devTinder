const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);


const server = http.createServer(app);

initializeSocket(server);
// app.post("/signup", async (req, res) => {
//     // console.log(req.body);
//     const userObj = {
//         firstName: "Prashant",
//         lastName: "Shinde",
//         emailId: "prashant@gmail.com",
//         password: "prashant@123"
//     }

//     // Creating the new instance of the user model

//     const user = new User(req.body);


//     // All mongoose functions are retuning promises

//     try {
//         await user.save();
//         res.send("User Added Successfully");
//     } catch (err) {
//         res.status(400).send("Error Saving the user:" + err.message);
//     }

// })

// For One user

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    // FindOne
    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }

    }

    // try{
    //     const users = await User.find({emailId:userEmail})
    //     if(users.length === 0){
    //         res.status(404).send("User not found");
    //     }else{
    //         res.send(users);
    //     }
    // }
    catch (err) {
        res.status(404).send("Something went wrong");
    }

})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;


    try {

        const Allowed_updates = ["userId", "photoUrl", "about", "gender", "age"];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            Allowed_updates.includes(k)
        )

        if (!isUpdateAllowed) {
            res.status(400).send("Update Not allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills Cannot Be More Than 10");
        }

        await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        });
        res.send("User Updaed Successfully");
    } catch (err) {
        res.send(400).send("Something went wrong");
    }
})
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted succesfully");

    } catch (err) {
        res.status(400).send("Something Went wrong");

    }
})

// Feed API - GET/feed get all the users from the database

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);

    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established");
        server.listen(3000, () => {
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