const express = require("express");

const app = express();


app.use("/test",(req,res) => {
    res.send("Hello from the Test !");
})

app.use("/hello",(req,res) => {
    res.send("Hello Hello Hello");
})

app.use("/",(req,res) => {
    res.send("Hello from the Dashboard!");
})

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});