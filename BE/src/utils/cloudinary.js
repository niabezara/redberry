import { v2 as cloudinary } from "cloudinary";

// Explicitly trim and validate cloud name
const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();

cloudinary.config({
  cloud_name: cloudName,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Add detailed configuration logging
export default cloudinary;
