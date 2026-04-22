# 🚀 Kritsarat Portfolio - Professional Developer Edition

A modern, high-performance portfolio website built for developers and educators. Featuring a premium "Developer Dark" aesthetic, Supabase integration, and a professional administrative console.

[View Live Demo](https://kritsarat-portfolio.vercel.app) *(Replace with your actual Vercel URL)*

---

## ✨ Features

- **Premium UI/UX**: Stunning "Developer Dark" theme with glassmorphism, grid backgrounds, and smooth micro-animations.
- **Dynamic Content**: Managed via a professional Admin Dashboard.
- **Supabase Powered**: High-performance PostgreSQL database with Drizzle ORM.
- **Vercel Ready**: Optimized for serverless deployment with seamless routing.
- **Bilingual Taglines**: Supporting both Thai and English for a global reach.
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React.
- **Backend**: Express.js, tRPC (Type-safe API).
- **Database**: PostgreSQL (via Supabase), Drizzle ORM.
- **Deployment**: Vercel (Serverless).

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v20+)
- pnpm (`npm install -g pnpm`)

### 2. Clone the Repository
```bash
git clone https://github.com/kritsaratdua-eng/kritsarat-portfolio.git
cd kritsarat-portfolio
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_random_secret_key
OWNER_OPEN_ID=your_openid_for_admin_access
```

### 5. Database Push
Initialize your Supabase schema:
```bash
pnpm drizzle-kit push
```

### 6. Run Development Server
```bash
pnpm dev
```

---

## 🌍 Deployment (Vercel)

1. Connect your GitHub repository to **Vercel**.
2. Add the **Environment Variables** listed above in the Vercel Dashboard.
3. Vercel will automatically detect `vercel.json` and deploy the project.

---

## 🛡 Admin Panel

Access the professional admin console at `/admin` (Login required via OAuth/OpenID).
- **Projects**: Manage featured work and tech stacks.
- **Teaching**: Log your educator experiences and achievements.
- **Gallery**: Upload and organize event photos.
- **Live Demos**: Showcase your interactive applications.

---

## 🇹🇭 ข้อมูลภาษาไทย (Thai Context)

พอร์ตโฟลิโอฉบับอัปเกรดนี้ถูกออกแบบมาเพื่อ **Software Developer และ Educator** โดยเฉพาะ:
- **Database**: ย้ายมาใช้ **Supabase (PostgreSQL)** เพื่อประสิทธิภาพและความเสถียร
- **UI/UX**: ปรับปรุงเป็น **Dark Mode** แนว Developer ที่ดูเป็นมืออาชีพ
- **Admin**: ระบบหลังบ้านใหม่ ใช้งานง่าย พร้อมรองรับการอัปโหลดรูปภาพและการจัดการข้อมูลครบวงจร

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by Kritsarat Duangin**
