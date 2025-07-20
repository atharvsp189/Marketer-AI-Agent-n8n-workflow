const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ✅ Replace this with your actual Cloudinary image URL
const imageUrl = 'https://res.cloudinary.com/dbuaftps7/image/upload/v1752993014/puppeteer_uploads/imv3kskrmhwyqjrvrvgw.png';

// ✅ Set local file name
const fileName = 'downloaded-image.png';
const filePath = path.join(__dirname, fileName);

// 🔁 Download function
(async () => {
    try {
        console.log('⏬ Downloading image from:', imageUrl);

        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`✅ Image saved locally as ${fileName}`);
        });

        writer.on('error', (err) => {
            console.error('❌ Error writing image:', err.message);
        });

    } catch (error) {
        console.error('❌ Failed to download image:', error.message);
    }
})();
