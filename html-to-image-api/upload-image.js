const cloudinary = require('cloudinary').v2;
const path = require('path');

// 🔁 1. Setup Cloudinary Credentials
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',     // 👈 replace this
  api_key: 'YOUR_API_KEY',           // 👈 replace this
  api_secret: 'YOUR_API_SECRET'      // 👈 replace this
});

// 📤 2. Upload the image
const filePath = path.join(__dirname, 'screenshot.png');  // or test-output.png

cloudinary.uploader.upload(filePath, { folder: "puppeteer_uploads" }, (error, result) => {
  if (error) {
    console.error("❌ Upload failed:", error);
  } else {
    console.log("✅ Upload successful!");
    console.log("📎 Image URL:", result.secure_url);
  }
});
