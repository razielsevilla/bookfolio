# Living Codex — Personal Portfolio

This repository contains the source code for a high-end, production-grade personal portfolio designed as an interactive "Living Codex." It features a custom book-flip engine, modular architecture, and a centralized data-driven system (Sanity CMS) for long-term scalability.

## 📖 Project Overview
The portfolio is designed as a digital manuscript that chronicles a professional journey. It moves away from traditional scrolling layouts in favor of an immersive Page-Flip experience, utilizing modern React patterns and a utility-first design system.

## 📂 Repository Structure
- **`/bookfolio`**: The core Next.js frontend application, featuring the "Living Codex" engine.
- **`/studio`**: The Sanity CMS backend for managing content dynamically.
- **`/sanity-schemas`**: Shared Sanity schemas used across the project.
- **`README.md`**: High-level repository overview.

## 🛠️ Tech Stack
- **Frontend:** Next.js, React 19, Tailwind CSS v4.
- **CMS/Backend:** Sanity Studio v3.
- **Engine:** Custom book-flip engine (React components, CSS transitions).

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd Bookfolio
```

### 2. Set up the Studio (Backend)
```bash
cd studio
npm install
npm run dev
```
*(The Sanity Studio runs on localhost:3333)*

### 3. Set up the Frontend
Open a new terminal window:
```bash
cd bookfolio
npm install
npm run dev
```
*(The Next.js app runs on localhost:3000)*