const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:100
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String ,
        required:true
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
        default:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image-300x298.jpg"
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