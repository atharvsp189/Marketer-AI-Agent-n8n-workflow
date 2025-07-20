const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const app = express();
app.use(express.json({ limit: '10mb' }));

var reqFulfilled = 0;

app.post('/capture', async (req, res) => {
    console.log(`[${new Date().toISOString()}] Received request`);
    const { html } = req.body;
    const selector = '#capture-box';
    if (!html) return res.status(400).send("Missing HTML");

    const start = Date.now();

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set HTML content directly
    await page.setContent(`
    <html>
      <head>
        <style>
          body {
              background-color: #fffaf6;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }

          #capture-box {
              width: 400px;
              height: 400px;
              text-align: center;
              padding: 40px 20px;
              background-color: #fffaf6;
              color: #222;
          }

          #capture-box p:first-of-type {
              color: #f97316;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 2px;
              margin-bottom: 20px;
              text-transform: uppercase;
          }

          #capture-box h1 {
              font-size: 28px;
              font-weight: 800;
              line-height: 1.2;
              margin-bottom: 25px;
          }

          #capture-box p:nth-of-type(2) {
              font-size: 16px;
              color: #444;
              line-height: 1.6;
              margin-bottom: 40px;
          }

          #capture-box div:last-of-type {
              background-color: #f97316;
              color: white;
              padding: 6px 16px;
              font-weight: bold;
              font-size: 16px;
              border-radius: 6px;
              display: inline-block;
              position: relative;
          }

          #capture-box div:last-of-type::before,
          #capture-box div:last-of-type::after {
              content: '';
              position: absolute;
              bottom: 0;
              width: 8px;
              height: 8px;
              background-color: #f97316;
              border-radius: 50%;
          }

          #capture-box div:last-of-type::before {
              left: -10px;
          }

          #capture-box div:last-of-type::after {
              right: -10px;
          }
        </style>
      </head>
      <body>
        <div id="capture-box">
        ${html}
        </div>
      </body>
    </html>
  `, { waitUntil: 'networkidle0' });

    // Wait for the selector to be available
    console.log("HTML : ", html)
    await page.waitForSelector(selector);

    // Select the element
    const element = await page.$(selector);

    const fileName = `screenshot_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;
    const filePath = path.join(__dirname, fileName);
    await element.screenshot({ path: filePath });
    
    await browser.close();
    
    // cloudinary.uploader.upload(filePath, { folder: "puppeteer_uploads" }, (error, result) => {
    //     if (error) {
    //         console.error("❌ Upload failed:", error);
    //         return res.status(500).json({ error: "Upload to Cloudinary failed" });
    //     } else {
    //         console.log("✅ Upload successful!");
    //         console.log("📎 Image URL:", result.secure_url);
    //         const fileUrl = result.secure_url;
    //         res.json({ url: fileUrl });
    //     }
    // });
    // reqFulfilled += 1;
    // console.log("Request Done: ", reqFulfilled)
    // fs.unlink(filePath, (err) => {
    // if (err) console.error('❌ Failed to delete local file:', err);
    // else console.log(`🧹 Deleted temp file: ${filePath}`);
    
    try {
        // ✅ Upload first
        const result = await cloudinary.uploader.upload(filePath, { folder: "puppeteer_uploads" });

        console.log("✅ Upload successful!");
        console.log("📎 Image URL:", result.secure_url);

        // ✅ Then delete local file
        fs.unlink(filePath, (err) => {
            if (err) console.error('❌ Failed to delete local file:', err);
            else console.log(`🧹 Deleted temp file: ${filePath}`);
        });

        // ✅ Finally send response
        res.json({ url: result.secure_url });

    } catch (error) {
        console.error("❌ Upload failed:", error);
        res.status(500).json({ error: "Upload to Cloudinary failed" });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('API running on http://0.0.0.0:3000');
});
