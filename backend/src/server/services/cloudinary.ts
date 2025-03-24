import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "node:fs";
import validatedEnv from "../../util/validatedEnv.js";

cloudinary.config({
    cloud_name: validatedEnv.CDNY_CLOUD_NAME,
    api_key: validatedEnv.CDNY_API_KEY,
    api_secret: validatedEnv.CDNY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | string> => {
    try {
        if(!localFilePath) {
            return "Local path not found";
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });

        return response.url;

    } catch(error) {
        fs.unlinkSync(localFilePath);
        return error instanceof Error ? error.message : "Unknown error";
    }
}

export default cloudinary;
export { uploadOnCloudinary };
