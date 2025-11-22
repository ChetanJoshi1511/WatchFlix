import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema  = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        index:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
    },
    fullname:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        index:true
    },
    avatar:{
        type: String, //store url from cloudinary
        required: false
    },
    coverimage:{
        type: String //store url from cloudinary
    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required!"]
    },
    refreshtoken:{
        type:String,
    }
},{timestamps:true});

userSchema.pre("save",async function (next){
    //run this pre hook only when password field is modified
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,saltRounds);
    next();
});

//add a custom method for our schema to validate password
userSchema.methods.isPasswordCorrect = async (newPassword)=>{ 
    return await bcrypt.compare(newPassword,this.password); //compare() return true or false depending upon match result
}

//custom method for schema to generate access token
userSchema.methods.generateAccessToken = function(){
    return Promise((resolve,reject)=>{ //wrap jwt.sign() around Promise
        jwt.sign({
            _id: this._id,
            email:this.email,
            username: this.username,
            fullname: this.fullname
        },process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: HS256,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
        (err,token)=>{ 
            if(err) reject(err);
            else resolve(token);
        });
    });
}

//custom method for schema to generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return Promise((resolve,reject)=>{ //wrap jwt.sign() around Promise
        jwt.sign({
            _id: this._id,
        },process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: HS256,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },
        (err,token)=>{ 
            if(err) reject(err);
            else resolve(token);
        });
    });
}

export const User = mongoose.model("User",userSchema);