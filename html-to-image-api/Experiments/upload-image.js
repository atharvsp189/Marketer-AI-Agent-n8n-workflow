const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const filePath = path.join(__dirname, 'test-output.png');
console.log(filePath)

cloudinary.uploader.upload(filePath, { folder: "puppeteer_uploads" }, (error, result) => {
  if (error) {
    console.error("❌ Upload failed:", error);
  } else {
    console.log("✅ Upload successful!");
    console.log("📎 Image URL:", result.secure_url);
  }
});

