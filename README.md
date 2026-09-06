# DREAMZ DC Dispensary — Full-Stack Website

[![Node.js](https://img.shields.io/badge/Node-24.19.0-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

> **DREAMZ DC Compound** — Washington DC's premier cannabis dispensary & delivery service. Full-stack e-commerce platform.

## 🚀 Quick Start

### Local Development
```bash
cd /c/Users/jorda/Desktop/Projects/websites/dreamz-dc
npm install
npm run dev
```
→ Opens at `http://localhost:3000`

### Production
```bash
npm start
```

## 📦 Deployment

### Vercel
```bash
vercel deploy
```
Uses `vercel.json` configuration for routing and Node.js runtime.

### Railway
```bash
# Connect your repo on Railway, uses Dockerfile automatically
```

## 🏗️ Architecture

```
dreamz-dc/
├── server/                    # Express.js Backend
│   ├── index.js              # Main server entry point
│   ├── routes/
│   │   ├── products.js       # Product API routes
│   │   └── cart.js           # Shopping cart API
│   └── data/
│       └── products.js       # Product database & business config
├── public/                    # Frontend Static Files
│   ├── index.html            # Main homepage (with all features)
│   ├── blog.html             # Blog page with 6 articles
│   ├── css/
│   ├── js/
│   └── images/              # 43+ product & brand images
├── package.json
├── vercel.json               # Vercel deployment config
├── Dockerfile                # Railway/Docker deployment
└── README.md
```

## ✨ Features

- **Age Gate** — 21+ verification with self-certification option
- **Auto-Scroll Announcement Bar** — 3 promotional announcements rotating
- **Full Product Catalog** — 27+ products across categories
- **Shopping Cart** — Add/view/remove items with real-time totals
- **API Endpoints**:
  - `GET /api/products` — Full product catalog with filtering
  - `GET /api/products/:id` — Single product
  - `GET /api/business` — Business info (hours, address, contact)
  - `GET /api/categories` — Product categories
  - `GET /api/cart` / `POST /api/cart` / `PATCH /api/cart/:id` / `DELETE /api/cart/:id`
  - `GET /api/health` — Health check
- **Blog** — 6 articles including "How To Buy Weed In Washington DC" and "How Delivery Works"
- **FAQ Section** — 8 accordion questions
- **How Delivery Works** — 3-step process
- **Brand Showcase** — DREAMZ COMPOUND, Cookies, Ganjavores, Jeeter Juice, and more
- **Flower Sub-Categories** — Bulk, Pre-Ground, Premium, Shake & Trim, Small Buds, Whole Flower
- **Mobile Responsive** — Full responsive design with mobile navigation
- **SEO Optimized** — Meta tags, OG tags, semantic HTML
- **Self-Cert Link** — `https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39`

## 📍 Business Information

| Field | Value |
|-------|-------|
| **Name** | DREAMZ DC |
| **Display Name** | DREAMZ DC Compound |
| **Phone** | (202) 709-8944 |
| **Email** | info@dreamzdccompound.shop |
| **Address** | 611 Pennsylvania Ave SE, 2nd Floor, Washington, DC 20003 |
| **Hours** | Sun-Wed: 10AM-12AM, Thu-Sat: 10AM-3AM EST |
| **Self-Cert** | [Register Here](https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39) |
| **Social** | [Instagram](https://www.instagram.com/dccompound_), [Facebook](https://www.facebook.com/dccompound), [X](https://www.x.com/dccompound) |

## 🛒 Products

**27+ products** across categories:
- **Flower**: DREAMZ Compound, Ganjavores Green Crack, Cookies Blue Suede, Jenny Kush, etc.
- **Vapes**: DREAMZ Cartridge, Jeeter Juice Disposables, BackpackBoyz, Cookies BernieHana, etc.
- **Edibles**: DREAMZ Gummies 1000mg, Muha Meds Purple Punch, DeVour Gummies
- **Pre-Rolls**: Cookies Madrina, DREAMZ Pre-Roll Pack
- **Accessories**: Cookies Clipper Lighter, DREAMZ Topicals, DREAMZ Tincture

## 🖼️ Assets

43+ images in `/public/images/` including:
- `logo.jpg` — DREAMZ DC logo (used for favicon/SEO)
- `storefront.jpg` — Storefront image (used as banner)
- `store inside.jpg` — Updated hero image
- `bulk-flower.jpg`, `pre-ground.jpg`, etc. — Category icons
- 30+ product photography images

## 📝 Blog Articles

1. **How To Buy Weed In Washington, DC** — Complete guide to purchasing in DC
2. **How Delivery Works in Washington, DC** — Delivery process walkthrough
3. **Understanding Cannabis Strains: Indica vs Sativa vs Hybrid** — Educational
4. **DREAMZ DC Product Guide: What's New This Month** — Product spotlight
5. **Cannabis Safety: What to Look For** — Lab testing and safety
6. **DC Cannabis Laws Explained (2026 Update)** — Legal overview

## 🎨 Design System

- **Primary**: Dark theme (#0a0a0f) with gold accents (#d4a853)
- **Accent**: Coral red (#e94560) for CTAs and badges
- **Typography**: Inter font family via Google Fonts
- **Icons**: Font Awesome 6.5
- **Responsive**: Mobile-first CSS Grid/Flexbox

## 🔧 Tech Stack

- **Backend**: Node.js 24 + Express.js 4.18
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework dependency)
- **Database**: In-memory JavaScript arrays (ready for MongoDB/PostgreSQL)
- **Deployment**: Vercel / Railway / Docker
- **Images**: 43+ product photos in `/public/images/`

## 📋 TODO / Next Steps

- [ ] Add persistent database (MongoDB/PostgreSQL)
- [ ] Integrate payment processing (Stripe/Crypto)
- [ ] User authentication & accounts
- [ ] Order tracking system
- [ ] Admin dashboard for product management
- [ ] Review analytics dashboard
- [ ] Add more product images from inventory spreadsheet
- [ ] Update prices from inventory spreadsheet
- [ ] Add newsletter subscription backend
- [ ] Category icon uploads
- [ ] Newsletter link integration

## 📄 License

MIT License — See [LICENSE](LICENSE)
# dreamz-dc
