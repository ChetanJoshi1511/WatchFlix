import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadToCloudinary,deleteFromCloudinary} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{

    //get user details from frontend
    const {username, fullname, email, password} = req.body;
    if([fullname,email,password,username].some((item)=>item?.trim()==="")){
        throw new apiError(400,"All fields are required!");
    }
    //check if user already exists : username,email
    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existingUser && existingUser.username==username) throw new apiError(409,"Username already exists");
    else if(existingUser && existingUser.email==email)  throw new apiError(409,"Email already exists!");

    //check for images, check for avatar from multer's req.file
    const avatarLocalPath = req.files?.avatar?.[0]?.path;  
    const coverimageLocalPath = req.files?.coverimage?.[0]?.path;
    if(!avatarLocalPath) throw new apiError(400,"Avatar file is required!");
    if(!coverimageLocalPath) throw new apiError(400,"Cover image is required!");

    //upload them to cloudinary, and check if it was successfuly saved to cloudinary 
    const avatarResponse = await uploadToCloudinary(avatarLocalPath);
    if(!avatarResponse) {
        throw new apiError(500, "Failed to upload avatar to Cloudinary");
    }
    
    const coverimageResponse  = await uploadToCloudinary(coverimageLocalPath);
    if(!coverimageResponse) {
        throw new apiError(500, "Failed to upload cover image to Cloudinary");
    }

    //create user object  - create entry in db
    const userDocument = await User.create({
        fullname: fullname,
        email:email,
        password:password,
        username: username.toLowerCase(),
        avatar: avatarResponse.url,
        coverimage: coverimageResponse.url
    });

    //fetch user from DB and remove password,refresh token field from response
    const createdUser = await User.findById(userDocument._id).select(
        "-password -refreshToken"
    )

    //check for user creation
    if(!createdUser){
        const del_avatar = deleteFromCloudinary(avatarResponse.public_id);
        const del_coverimage = deleteFromCloudinary(coverimageResponse.public_id);
        if(!del_avatar || del_coverimage){
            console.warn("Files could not be deleted from cloudinary!");
        }
        throw apiError(500,"Cannot register user!");    
    }

    //return response
    return res.status(201).json(
        new apiResponse(200,createdUser,"User registered successfully!")
    )
    //fields validation - not empty
});

const loginUser = asyncHandler(async () =>{
    return;
});

export {registerUser,loginUser};