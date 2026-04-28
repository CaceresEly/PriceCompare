# 🚀 PriceCompare

A fullstack price tracking app with real-time insights and WhatsApp alerts.

🔗 Live Demo: https://price-compare-livid.vercel.app  
💻 Source Code: https://github.com/CaceresEly/PriceCompare  

---

## ✨ Features

- 🔍 Product search across providers
- 📊 Price intelligence (best offer, average, historical low)
- 📉 Visual price positioning (price ruler)
- 🔔 Price alerts with target price
- 📱 WhatsApp notifications via Twilio
- ⏱ Automated alert checks with cron jobs
- ⚡ Serverless deployment (Vercel)

---

## 🧠 How it works

1. User searches for a product  
2. App fetches and aggregates product data  
3. Price insights are calculated in real-time  
4. User sets a target price alert  
5. A cron job periodically checks prices  
6. If the price condition is met → WhatsApp notification is sent  

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript

**Backend**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)

**Integrations**
- Twilio (WhatsApp API)

**Infrastructure**
- Vercel (Deployment + Cron Jobs)

---

## ⚙️ Environment Variables

To run this project locally, create a `.env` file:

```env
DATABASE_URL=your_database_url
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
