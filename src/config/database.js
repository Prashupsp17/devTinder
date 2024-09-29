const mongoose = require("mongoose");


const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://shindeprashant967:xsbAqG6xLiIkLTSL@namastenode.busjq.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
