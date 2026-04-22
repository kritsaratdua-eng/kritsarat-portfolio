# Kritsarat Portfolio - TODO

## Database & Backend
- [x] Create database schema: projects, teaching_experiences, gallery_images, teaching_plans, live_demos, contact_info tables
- [x] Run migration and apply SQL
- [x] Create tRPC routers for all sections (CRUD)
- [x] Seed default data for skills and contact info

## Frontend - Global
- [x] Set dark mode theme in index.css (deep dark palette, cyan/purple accent)
- [x] Add Google Fonts (Inter + Space Grotesk) in index.html
- [x] Set defaultTheme="dark" in App.tsx
- [x] Create Navbar with smooth scroll navigation
- [x] Create Footer component
- [x] Setup routes: / (portfolio), /admin (admin panel)

## Frontend - Portfolio Sections
- [x] Hero Section: name, title, bilingual tagline, profile photo placeholder, animated entrance
- [x] Skills & Technologies Section: visual skill badges for all 13 technologies
- [x] Projects Section: project cards with name, description, tech stack, links
- [x] Teaching Experience Section: highlight coding education work
- [x] Activity Gallery Section: grid/carousel layout with images
- [x] Teaching Plans Section: structured lesson plans display
- [x] Live Demo Section: embedded interactive demos/links
- [x] Contact / Social Links Section: email, phone, LinkedIn, GitHub

## Frontend - Admin Panel
- [x] Admin Panel route /admin (owner-only protected)
- [x] Admin: Manage Projects (add/edit/delete)
- [x] Admin: Manage Teaching Experience (add/edit/delete)
- [x] Admin: Manage Gallery Images (add/edit/delete with file upload)
- [x] Admin: Manage Teaching Plans (add/edit/delete)
- [x] Admin: Manage Live Demos (add/edit/delete)
- [x] Admin: Manage Contact Info (edit)

## Quality & Polish
- [x] Smooth scroll animations (framer-motion) on all sections
- [x] Fully responsive layout (mobile, tablet, desktop)
- [x] Loading states and empty states for all sections
- [x] Write vitest tests for backend routers (18 tests passing)
- [x] Save checkpoint

## Admin Login & Access
- [x] สร้างหน้า /login ที่สวยงามสำหรับ Admin Login
- [x] ปุ่ม Admin Login ใน Navbar แสดงเสมอ (ไม่ซ่อน) เพื่อให้เข้าถึงได้ง่าย
- [x] หน้า Admin redirect ไป /login อัตโนมัติเมื่อยังไม่ได้ login
- [x] Admin Login ใน Navbar (desktop + mobile)
