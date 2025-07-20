async function convertHtmlToImage(content, options = {}) {
    const response = await fetch('http://localhost:3000/api/html-to-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            customStyles: options.customStyles || '',
            width: options.width || 800,
            height: options.height || null,
            format: options.format || 'png',
            quality: options.quality || 90
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.message}`);
    }

    return await response.blob();
}

async function example1() {
    const htmlContent = `
    <h1>My Custom Report</h1>
    <p>This is a <strong>dynamically generated</strong> report.</p>
    <ul>
      <li>Revenue: $50,000</li>
      <li>Users: 1,250</li>
      <li>Growth: +15%</li>
    </ul>
  `;

    try {
        const imageBlob = await convertHtmlToImage(htmlContent);

        // Save to file (Node.js)
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const arrayBuffer = await imageBlob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync('output.png', buffer);
            console.log('Image saved as output.png');
        } else {
            // Browser usage - create download link
            const url = URL.createObjectURL(imageBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-image.png';
            a.click();
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// 2. Custom Styling Example
async function example2() {
    const content = `
    <h1>Custom Styled Content</h1>
    <p>This box has custom styling applied.</p>
    <div class="highlight-box">
      <p>This is a highlighted section!</p>
    </div>
  `;

    const customStyles = `
    .content-box {
      background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
      border: none;
    }
    
    .content-area {
      color: white;
      text-align: center;
    }
    
    .highlight-box {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
      backdrop-filter: blur(10px);
    }
  `;

    const imageBlob = await convertHtmlToImage(content, {
        customStyles,
        width: 600,
        format: 'png'
    });

    console.log('Custom styled image generated');
}


example1(); 