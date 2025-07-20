const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

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
              width: 360px;
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
        ${html}
      </body>
    </html>
  `, { waitUntil: 'networkidle0' });

    // Wait for the selector to be available
    await page.waitForSelector(selector);

    // Select the element
    const element = await page.$(selector);

    // Save the screenshot of the element
    const filePath = path.join(__dirname, 'screenshot.png');
    await element.screenshot({ path: filePath });

    await browser.close();
    console.log(`[${Date.now() - start}ms] Screenshot saved to ${filePath}`);

    res.sendFile(filePath);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('API running on http://0.0.0.0:3000');
});
