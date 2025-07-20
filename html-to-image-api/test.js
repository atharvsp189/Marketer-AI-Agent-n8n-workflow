// test-capture.js
const axios = require('axios');
const fs = require('fs');

(async () => {
    try {
        const html = `
      <div id="capture-box">
        <p>🔥 Featured Post</p>
        <h1>Beautiful Image with Puppeteer</h1>
        <p>This image is saved locally using Node.js and Puppeteer!</p>
        <div>Check it out</div>
      </div>
    `;

        console.log("⏳ Sending HTML to /capture...");
        const response = await axios.post('http://localhost:3000/capture', { html }, {
            responseType: 'arraybuffer' // Important to handle image binary
        });

        fs.writeFileSync('test-output.png', response.data);
        console.log("✅ Image saved as test-output.png");

    } catch (err) {
        console.error("❌ Error during test:", err.message);
    }
})();
