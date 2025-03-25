import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CDNY_CLOUD_NAME,
  api_key: process.env.CDNY_API_KEY,
  api_secret: process.env.CDNY_API_SECRET,
  secure: true, // Ensures secure URLs
});

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadApiResponse | string> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(localFilePath)) {
      return reject("File not found at the specified path.");
    }

    cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }, // Supports image, video, raw, etc.
      (error, result) => {
        // Delete the local file regardless of success or error
        fs.unlink(localFilePath, (err) => {
          if (err) console.error("Failed to delete local file:", err);
        });

        if (error) {
          return reject(`Upload failed: ${error.message}`);
        }

        resolve(result?.url || "Upload successful, but no URL returned.");
      }
    );
  });
};

export default cloudinary;
export { uploadOnCloudinary };
