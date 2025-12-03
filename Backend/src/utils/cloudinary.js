import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

/* First get the file from the user and store it temporarily on the server then upload it to cloudinary. Once it has been 
done remove the file/ unlink the file descriptor opened from the server */

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath) return null;
        // ensure absolute path and file exists
        const resolvedPath = path.resolve(localFilePath);
        if (!fs.existsSync(resolvedPath)) throw new Error(`File not found: ${resolvedPath}`);

        const response = await cloudinary.uploader.upload(resolvedPath, {
            resource_type: "auto"
        });

        // remove temp file after successful upload
        try {
            fs.unlinkSync(resolvedPath);
        } catch (e) {
            console.warn('Could not remove temp file after upload', resolvedPath, e.message);
        }
        return response;
    }catch (error){
        console.error('Cloudinary upload error:', error && (error.message || error));
        try { 
            //remove locally stored file if upload fails
            if (localFilePath && fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); 
        } catch (e) { 
            console.warn('Failed to remove local file after error', localFilePath, e.message); 
        }
        return null;
    }
}

//function to delete files using public id (taken from response while uploading file)
const deleteFromCloudinary = async (publicID)=>{
    try{
        const result = await cloudinary.uploader.destroy(publicID);
        console.log("Deleted from cloudinary...")
        return result;
    }catch(err){
        console.error(err);
        return null;
    }
}

export  {uploadToCloudinary, deleteFromCloudinary};
