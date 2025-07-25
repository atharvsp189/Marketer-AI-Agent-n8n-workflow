﻿# Vibe-Marketer 🧠📲

**Vibe-Marketer** is an AI-powered content creation agent designed to automate and enhance **Instagram-style social media marketing**.

> Just give it a list of topics, and it will do the rest – from content generation to visual design and posting!

---
## 🧩 Workflow

complete `n8n` workflow:  
👉 [Vibe-Marketer Workflow (Recording)](n8n-workflow-marketing-ai-agent.mp4)

## 🚀 Key Features

- **📌 Topic-Driven AI Content Creation**  
  Provide a simple list of topics – the agent automatically writes human-like posts around them using an AI model (Claude via OpenRouter).

- **🔁 Human-in-the-Loop Iteration**  
  Review, modify, and approve content before publishing. Feedback loop helps improve content quality iteratively.

- **🖼️ HTML-to-Image Conversion**  
  Posts are converted to visually rich Instagram-style images using a custom HTML-to-Image API (Node.js).

- **📁 Drive Upload**  
  Generated images are stored on **Google Drive** as a temporary review space before final posting.

- **📱 Social Media Publishing**  
  After human approval, the final image post is automatically uploaded to the selected social media platform.

- **🔗 Built using n8n Workflow Automation**  
  Orchestrated entirely via [n8n](https://n8n.io) – no-code/low-code open-source workflow automation platform.

---

## 🛠 Tech Stack

- `n8n` – Workflow orchestration and automation
- `Claude API` via OpenRouter – AI content generation
- `server.js` – Custom HTML-to-Image converter
- `Google Drive API` – Temporary post storage
- (Optional) `Instagram/Meta Graph API` – Social media publishing

---

## 📂 How It Works (Workflow Overview)

1. ✅ **Input Topics**  
   Provide a list of content topics (via Google Sheet, form, or direct n8n trigger).

2. 🧠 **AI Post Generation**  
   Claude generates post content (title + caption) for each topic.

3. 👤 **Human Review Loop**  
   The generated post is sent to a Google Doc for manual editing or feedback.

4. 🖼️ **Image Creation**  
   Final content is rendered into a stylish HTML post → converted into an image using the HTML-to-Image API.

5. ☁️ **Upload to Google Drive**  
   Image is uploaded for review and approval.

6. 🚀 **Publishing**  
   Once approved, image post is uploaded to social media platforms (Instagram, etc.).

---

## 📸 Output Sample

The final output is a professional-looking Instagram post like this:  


---

## 🔧 Setup Instructions

> ⚠️ Prerequisites:
> - n8n instance (self-hosted or cloud)
> - Claude/OpenRouter API key
> - Google Drive API setup
> - Node.js environment for the HTML-to-Image API

1. **Clone the repo**  
   ```
   git clone https://github.com/atharvsp189/Vibe-Marketer.git
   ```

2. Install dependencies for HTML-to-Image API
    ```
    cd html-to-image-api
    npm install
    node server.js
    ```
3. Import n8n workflow

4. Import the .json workflow into your n8n instance.

Configure environment variables Add your API keys and webhook endpoints directly in the workflow through created credentials.

💡 Future Roadmap
- Support for multi-language content generation
- Auto-scheduling posts
- Integration with more platforms (LinkedIn, Twitter, Facebook)
- Feedback-based learning loop for post quality improvement

📬 Contact
Made with ❤️ by Atharv Patil
For queries or suggestions, open an issue or reach out via GitHub.
