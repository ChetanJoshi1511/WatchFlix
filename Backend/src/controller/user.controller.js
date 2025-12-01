import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js";


const registerUser = asyncHandler(async (req,res)=>{
    //get user details from frontend
    //fields validation - not empty
    //check if user already exists : username,email
    //check for images, check for avatar
    //upload them to cloudinary, and check if it was successfuly saved to cloudinary 
    //create user object  - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response
    const {username, fullName, email, password} = req.body;
    if(fullName)
    console.log(req.body);
});

const loginUser = asyncHandler(async () =>{
    return;
});

export {registerUser,loginUser};