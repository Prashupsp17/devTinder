const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){

                throw new Error("Invalid Email Address "+value);
            }
        }
    },
    password:{
        type:String ,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){

                throw new Error("Enter a new password "+value);
            }
        }
    },
    age:{
        type:String ,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image-300x298.jpg",
        validate(value){
            if(!validator.isURL(value)){

                throw new Error("Invalid Photo URL "+value);
            }
        }
    },
    about:{
        type:String
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})

userSchema.methods.getJWT = async function (){

    const user = this;
    const token = await jwt.sign({ _id: user._id }, "prashant",{
        expiresIn:"1d",
    });
    return token;
}

userSchema.index({firstName:1,lastName:1});

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);