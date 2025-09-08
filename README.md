# 📝 Markdown Render

<div align="center">

![Markdown Render Hero](/screenshots/screenshot1.png)
![Markdown Render Hero](/screenshots/screenshot2.png)

![Markdown Render Hero](https://img.shields.io/badge/Markdown-Render-blue?style=for-the-badge&logo=markdown&logoColor=white)

**A powerful, modern markdown render tool with advanced features, theme switching, and seamless content management.**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.0-5A0EF8?style=flat-square&logo=daisyui)](https://daisyui.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[✨ Live Demo](https://markdownrender.vercel.app) • [📖 Documentation](#-features) • [🚀 Quick Start](#-quick-start)

</div>

---

## 🌟 Overview

Transform your markdown files into beautifully rendered documents with our comprehensive markdown render tool. Built with modern web technologies, it offers a seamless experience for viewing, editing, and managing markdown content with advanced features like math equations, syntax highlighting, and interactive diagrams.

---

## 🚀 Hybrid Rendering Strategy

### **Best of Both Worlds**

This project leverages **Next.js's App Router** and **Pages Router** to achieve the best of both worlds:

- **App Router with React Server Components (RSC):**

  - Used for static site generation (SSG) on the `/` and `/about` pages.
  - Ensures lightning-fast page loads and SEO optimization for static content.
  - Ideal for pages that don’t require frequent updates or dynamic data.

- **Pages Router with Client-Side Rendering (CSR):**
  - Used for dynamic `/id` pages, where content is fetched and rendered on the client.
  - Provides a highly interactive experience for dynamic markdown content.
  - Perfect for scenarios where user-specific or frequently updated data is required.

This hybrid approach allows the app to balance **performance**, **SEO**, and **dynamic interactivity**.

---

## 🎯 Key Highlights

- **🚀 Lightning Fast** - Static pages with SSG and dynamic pages with CSR
- **🎨 Beautiful UI** - Modern design with DaisyUI components and Tailwind CSS
- **🌙 Theme Support** - Dark and light modes with persistent preferences
- **📱 Responsive** - Perfect experience across all devices
- **🔧 Developer Friendly** - JavaScript ES6+ support and clean architecture
- **📄 Export Ready** - Built-in PDF export functionality

---

## ✨ Features

### 🎯 Core Markdown Features

- **GitHub Flavored Markdown** - Tables, task lists, strikethrough, and autolinks
- **📐 Math Equations** - LaTeX math rendering with KaTeX for beautiful formulas
- **💻 Syntax Highlighting** - Code blocks with Prism.js highlighting for 200+ languages
- **📊 Mermaid Diagrams** - Flowcharts, sequence diagrams, and Gantt charts
- **🔗 Graphviz Charts** - DOT language graphs and network diagrams
- **🌐 Raw HTML Support** - Embed HTML elements and custom styling

### 🎨 User Experience

- **🌙 Theme Switching** - Dark/Light mode with system preference detection
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **🎯 Content Management** - Add, edit, and organize markdown files
- **📂 File Upload** - Drag & drop or browse to upload markdown files
- **🖨️ PDF Export** - Print to PDF with optimized layouts
- **💾 Auto-Save** - Persistent storage with Zustand state management

### ⚡ Performance & Developer Experience

- **🚀 Server-Side Rendering** - Fast initial page loads with Next.js
- **🔄 Hydration Handling** - Smooth client-side transitions
- **🎪 Loading States** - Beautiful loading animations and states
- **🔍 SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- **♿ Accessibility** - WCAG compliant design patterns

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheFastest599/markdown-render.git
   cd markdown-render
   ```
