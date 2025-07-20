// const express = require('express');
// const puppeteer = require('puppeteer');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();
// // app.use(bodyParser.json({ limit: '10mb' }));
// // ✅ Use built-in express JSON parser
// app.use(express.json({ limit: '10mb' }));

// app.post('/capture', async (req, res) => {
//   console.log(`[${new Date().toISOString()}] Received request`);
//   const { html} = req.body;
//   const selector = '#capture-box';
//   if (!html) return res.status(400).send("Missing HTML");

//   const start = Date.now();

//   const browser = await puppeteer.launch({
//     headless: 'new',
//     args: ['--no-sandbox', '--disable-setuid-sandbox']
//   });
//   console.log(`[${Date.now() - start}ms] Browser launched`)

//   const page = await browser.newPage();
//   console.log(`[${Date.now() - start}ms] HTML content loaded`);

//   // Load html2canvas CDN
//   const htmlWithCanvas = `
//     <html>
//       <head>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
//             <style>
//         body {
//             background-color: #fffaf6;
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             margin: 0;
//         }

//         #capture-box {
//             width: 360px;
//             text-align: center;
//             padding: 40px 20px;
//             background-color: #fffaf6;
//             color: #222;
//         }

//         #capture-box p:first-of-type {
//             color: #f97316;
//             /* Orange tone */
//             font-size: 12px;
//             font-weight: 600;
//             letter-spacing: 2px;
//             margin-bottom: 20px;
//             text-transform: uppercase;
//         }

//         #capture-box h1 {
//             font-size: 28px;
//             font-weight: 800;
//             line-height: 1.2;
//             margin-bottom: 25px;
//         }

//         #capture-box p:nth-of-type(2) {
//             font-size: 16px;
//             color: #444;
//             line-height: 1.6;
//             margin-bottom: 40px;
//         }

//         #capture-box div:last-of-type {
//             background-color: #f97316;
//             color: white;
//             padding: 6px 16px;
//             font-weight: bold;
//             font-size: 16px;
//             border-radius: 6px;
//             display: inline-block;
//             position: relative;
//         }

//         #capture-box div:last-of-type::before,
//         #capture-box div:last-of-type::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             width: 8px;
//             height: 8px;
//             background-color: #f97316;
//             border-radius: 50%;
//         }

//         #capture-box div:last-of-type::before {
//             left: -10px;
//         }

//         #capture-box div:last-of-type::after {
//             right: -10px;
//         }

//         canvas {
//             margin-top: 30px;
//         }
//     </style>
//       </head>
//       <body>    
//           ${html}
//         <script>
//           window.onload = async () => {
//             const el = document.querySelector('${selector}');
//             html2canvas(el).then(canvas => {
//               canvas.toBlob(blob => {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                   fetch('http://localhost:3000/_upload', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ dataUrl: reader.result })
//                   });
//                 };
//                 reader.readAsDataURL(blob);
//               });
//             });
//           };
//         </script>
//       </body>
//     </html>
//   `;

//   await page.setContent(htmlWithCanvas, { waitUntil: 'load' });

//   console.log(`[${Date.now() - start}ms]  HTML content loaded`)

  
//     const imagePromise = new Promise((resolve, reject) => {
//       resolveImage = resolve;
//       rejectImage = reject;
//       setTimeout(() => reject(new Error("Timeout on image upload")), 15000);

//       app.post('/_upload', (req2, res2) => {
//         clearTimeout(timeout);
//         resolve(req2.body.dataUrl);
//         res2.send("OK");
//       });
//     });
    
//     console.log(`[${Date.now() - start}ms] Image Promise Creates`);
//   await page.evaluate(() => {
//     html2canvas(document.querySelector('#capture-box')).then(canvas => {
//       fetch('http://127.0.0.1:3000/_upload', {  // 👈 Absolute URL here
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ dataUrl: canvas.toDataURL() })
//       });
//     });
//   });
//   console.log(`[${Date.now() - start}ms] Screenshot taken`);
//   const imageData = await imagePromise;

//   await browser.close();
//   console.log(`[${Date.now() - start}ms] Browser closed`);
//     // Send image
//     const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
//     const buffer = Buffer.from(base64Data, 'base64');
//     res.set('Content-Type', 'image/png');
//     res.send(buffer); // ✅ Using imageData here
    
// });

// // so n8n can access it
// // because n8n's localhost refers to localhost inside docker
// app.listen(3000, '0.0.0.0', () => {
//   console.log('API running on http://0.0.0.0:3000');
// });


