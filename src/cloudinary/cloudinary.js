import { v2 as cloudinary } from "cloudinary"
import { config } from "../config/config.js"
import fs from "fs"

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET
})

export const uploadToCloudinary = async (localImage) => {
    try {
      const response = await cloudinary.uploader.upload(localImage);
      if (!response) {
        console.log("Failed to upload the image to Cloudinary");
        return null;
      }
      fs.unlinkSync(localImage); // Delete the local image after upload
      console.log("Image uploaded to Cloudinary, local image deleted");
      return response;
    } catch (error) {
      fs.unlinkSync(localImage);
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };