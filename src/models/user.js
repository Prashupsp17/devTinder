const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("User",userSchema);