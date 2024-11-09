import { v2 as cloudinary } from "cloudinary"
import { config } from "../config/config.js"
import fs from "fs"

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET
})

export const uploadTOCloudinary = async (localImage) => {
    try {
        const response = await cloudinary.uploader.upload(localImage);
        if (!response) {
            console.log("Failed to upload the image to cloudnary");

        }
        fs.unlinkSync(localImage)
        console.log("localImage deleted");
        
        return response;
    } catch (error) {
        fs.unlinkSync(localImage)
        console.log("Error in cloudnary");
        console.log(error);

        return null;
    }
}