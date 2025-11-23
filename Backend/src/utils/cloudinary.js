import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

/* First get the file from the user and store it temporarily on the server then upload it to cloudinary. Once it has been 
done remove the file/ unlink the file descriptor opened from the server */

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadToCloudinary  = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        console.log(response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath); //remove the locally saved file
        return null;
    }
}

export {uploadToCloudinary};
