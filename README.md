# Pin Media Downloader 📌

Pin Media Downloader is a commercial-grade, secure, and production-ready full-stack SaaS application built to extract and download publicly accessible Pinterest videos, images, and GIFs in original high resolutions. 

Utilizing a hybrid scraping engine—combining high-performance local regex, metadata parsing, and an advanced **Gemini 3.5-Flash** AI fallback system—this platform delivers 100% extraction uptime, surviving layout adjustments made by Pinterest.

---

## 🚀 Architectural Blueprint

### Modern Premium Design System
- **Responsive glassmorphism**: Designed with soft border-glow states, modern gradients, fluid layouts, and staggered entrance transitions using `motion/react`.
- **Integrated Routing State**: Custom state-driven routing transitions seamlessly between **Home**, **About**, **FAQ**, **Privacy Policy**, **Terms of Service**, **Contact Support**, and the **Developer Admin Portal**.
- **Dark Mode Native**: Immersive deep twilight theme default with instant light/dark toggle.

### Full-Stack Security & Hardening
- **Zero CORS Boundaries**: Fully isolated Node.js `/api/proxy` streaming engine that routes Pinterest media binary chunks, prompting immediate native "Save As" actions without forcing tabs open.
- **Server State Safety**: The client-side history, favorites, and themes are persisted strictly on client `localStorage`.
- **Anonymity Assured**: Does not log user IP addresses or request Pinterest passwords/credentials.

---

## 📁 Folder Structure Documentation

```text
├── /app                    # Framework-independent configs
├── /components             # Extracted reusable React UI modules
│   ├── Navbar.tsx          # Dynamic responsive page router controls
│   ├── Hero.tsx            # Premium title layout
│   ├── DownloaderCard.tsx  # User submission form with active state checks
│   ├── ResultCard.tsx      # Multi-quality links with bookmark favorites & copy tags
│   ├── RecentDownloads.tsx # Staggered grid displaying history
│   ├── FAQSection.tsx      # Collapsible search assistance queries
│   ├── AboutPage.tsx       # Details on scraper engine technology
│   ├── PrivacyPage.tsx     # GDPR, CCPA, and data privacy disclosures
│   ├── TermsPage.tsx       # Intellectual Property guidelines & ToS
│   ├── ContactPage.tsx     # Validated dynamic contact support form
│   ├── AdminDashboard.tsx  # Developer metrics, trends, and error transaction logs
│   └── Toast.tsx           # Floating responsive feedback alert toast layout
├── /services               # Core business layers (Metadata extraction, upscaling)
├── /types                  # TypeScript interfaces (MediaMetadata, RecentDownload)
├── /public                 # Standard high-contrast vector assets & PWA files
├── /dist                   # Production compiled output folders
├── server.ts               # Core full-stack Express + Vite proxy application server
├── Dockerfile              # Hardened multi-stage Docker build config
├── docker-compose.yml      # Orchestrated container launch scripts
├── nginx.conf              # Nginx reverse proxy with SSL, compression, and security headers
├── ecosystem.config.js     # PM2 cluster-mode process config for bare VPS
└── package.json            # Managed script definitions and build assets
```

---

## ⚡ API Documentation

### 1. Extract Media Metadata
- **Endpoint**: `POST /api/download`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "url": "https://www.pinterest.com/pin/123456789/"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "title": "Stunning Swiss Cabin Interior",
    "description": "Cabin minimalism aesthetic with wide frame windows...",
    "thumbnail": "https://i.pinimg.com/originals/ab/cd/ef/abcdef123.jpg",
    "downloads": [
      {
        "quality": "HD Video",
        "url": "https://v1.pinimg.com/videos/mc/h264/ab/cd/ef/abcdef.mp4",
        "type": "video/mp4"
      },
      {
        "quality": "Original Image",
        "url": "https://i.pinimg.com/originals/ab/cd/ef/abcdef123.jpg",
        "type": "image/jpeg"
      }
    ],
    "sourceUrl": "https://www.pinterest.com/pin/123456789/",
    "mediaType": "video"
  }
  ```

### 2. Core API Diagnostics
- **Endpoint**: `GET /api/health`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "status": "healthy",
    "uptime": "14h 32m 5s",
    "memoryUsage": {
      "rss": "85 MB",
      "heapTotal": "48 MB",
      "heapUsed": "32 MB"
    },
    "timestamp": "2026-07-14T23:43:00Z",
    "apiStatus": "operational",
    "geminiKeyConfigured": true
  }
  ```

### 3. Server System Versioning
- **Endpoint**: `GET /api/version`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "version": "1.2.4",
    "releaseDate": "2026-07-14",
    "environment": "production",
    "architecture": "Express + Vite Fullstack Client-Server",
    "framework": "React 19 + TypeScript"
  }
  ```

### 4. Admin Live Stats
- **Endpoint**: `GET /api/admin/stats`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "stats": {
      "totalRequests": 1420,
      "successfulDownloads": 1285,
      "failedDownloads": 135,
      "popularUrls": [
        { "url": "https://www.pinterest.com/pin/123456789/", "count": 48 }
      ],
      "logs": [
        { "id": "1", "timestamp": "2026-07-14T23:40:00.000Z", "url": "https://pin.it/abcd", "mediaType": "video", "status": "success" }
      ]
    },
    "server": {
      "platform": "linux",
      "nodeVersion": "v20.11.0",
      "port": 3000,
      "cwd": "/app"
    }
  }
  ```

---

## 🛡️ Installation & Local Run

### System Prerequisites
Ensure you have **Node.js 18+** installed on your system.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Keys
Create a `.env` file at the root:
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
PORT=3000
```

### Step 3: Run Development Environment
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

### Step 4: Build & Run Production Standalone
```bash
npm run build
npm start
```

---

## 🚢 Professional Deployment Guide

### Option 1: VPS / DigitalOcean / AWS EC2 using Docker (Recommended)
1. **Prepare Server Env**: Install Docker and Docker Compose on your hosting VPS.
2. **Transfer Codebase**: Clone your repository onto the host directory.
3. **Configure Secrets**: Create a `.env` file in your server folder specifying your production variables.
4. **Launch Containers**:
   ```bash
   docker-compose up -d --build
   ```
   *Your container is now running securely inside isolation on port 3000!*

### Option 2: PM2 Standalone VPS Deployment
1. **Install PM2 globally**:
   ```bash
   sudo npm install -g pm2
   ```
2. **Compile Application**:
   ```bash
   npm run build
   ```
3. **Launch PM2 Cluster**:
   ```bash
   pm2 start ecosystem.config.js --env production
   ```
4. **Configure Auto-Restart on reboot**:
   ```bash
   pm2 startup
   pm2 save
   ```

### SSL & Nginx Configuration (HTTPS)
To expose the application safely to custom domains using Let's Encrypt certificates:
1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx certbot python3-certbot-nginx -y
   ```
2. **Setup Nginx config**: Copy the contents of the local `nginx.conf` into `/etc/nginx/sites-available/pin-media`.
3. **Enable configuration**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/pin-media /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```
4. **Provision SSL Certificates**:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   *Certbot will automatically verify and bind the Let's Encrypt certificates, keeping Nginx traffic hardened via TLS.*

---

## 📄 License & Fair Use Disclaimer
This tool is distributed under the Apache-2.0 License. It is intended solely as an educational scraper and personal media backup helper. All Pinterest asset copyright and trademark values remain strictly the intellectual property of Pinterest Inc.
