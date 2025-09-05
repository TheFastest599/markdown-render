# 📝 Markdown Render

<div align="center">

![Markdown Render Hero](https://img.shields.io/badge/Markdown-Render-blue?style=for-the-badge&logo=markdown&logoColor=white)

**A powerful, modern markdown render tool with advanced features, theme switching, and seamless content management.**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.0-5A0EF8?style=flat-square&logo=daisyui)](https://daisyui.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[✨ Live Demo](https://your-demo-link.vercel.app) • [📖 Documentation](#-features) • [🚀 Quick Start](#-quick-start)

</div>

---

## 🌟 Overview

Transform your markdown files into beautifully rendered documents with our comprehensive markdown render tool. Built with modern web technologies, it offers a seamless experience for viewing, editing, and managing markdown content with advanced features like math equations, syntax highlighting, and interactive diagrams.

### 🎯 Key Highlights

- **🚀 Lightning Fast** - Built with Next.js 14 and optimized for performance
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

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🏗️ Technology Stack

<div align="center">

| Frontend                                                                              | Styling                                                                                       | State Management                                                                     | Build Tools                                                                                     |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js) | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css) | ![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat-square)            | ![Webpack](https://img.shields.io/badge/Webpack-blue?style=flat-square&logo=webpack)            |
| ![React](https://img.shields.io/badge/React-blue?style=flat-square&logo=react)        | ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square)                     | ![Local Storage](https://img.shields.io/badge/LocalStorage-yellow?style=flat-square) | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript) |

</div>

### 📦 Key Dependencies

- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Core markdown rendering
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown support
- **[remark-math](https://github.com/remarkjs/remark-math)** - Math equation parsing
- **[rehype-katex](https://github.com/remarkjs/rehype-katex)** - LaTeX math rendering
- **[rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)** - Syntax highlighting
- **[mermaid](https://mermaid-js.github.io/)** - Diagram and flowchart rendering
- **[@hpcc-js/wasm](https://github.com/hpcc-systems/hpcc-js-wasm)** - Graphviz support

---

## 📁 Project Structure

```
markdown-render/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 layout.jsx          # Root layout with metadata
│   │   ├── 📄 page.jsx            # Main page component
│   │   └── 📄 globals.css         # Global styles
│   ├── 📁 components/
│   │   ├── 📄 MarkdownRenderer.jsx # Core markdown rendering
│   │   ├── 📄 Navbar.jsx          # Navigation component
│   │   ├── 📄 Drawer.jsx          # Sidebar navigation
│   │   ├── 📄 AddContent.jsx      # Content management modal
│   │   ├── 📄 Loading.jsx         # Loading states
│   │   └── 📄 HydrationLoader.jsx # SSR hydration handler
│   └── 📁 stores/
│       └── 📄 globalStore.js       # Zustand state management
├── 📄 package.json                # Dependencies and scripts
├── 📄 tailwind.config.js          # Tailwind configuration
├── 📄 next.config.js              # Next.js configuration
└── 📄 README.md                   # This file
```

---

## 🎨 Usage Examples

### Basic Markdown Rendering

```jsx
import MarkdownRenderer from '@/components/MarkdownRenderer';

const content = `
# Hello World

This is **bold** and this is *italic*.

\`\`\`javascript
console.log('Syntax highlighting works!');
\`\`\`
`;

<MarkdownRenderer content={content} />;
```

### Math Equations

```markdown
Inline math: $E = mc^2$

Block math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Mermaid Diagrams

```markdown
\`\`\`mermaid
graph TD
A[Start] --> B{Is it working?}
B -->|Yes| C[Great!]
B -->|No| D[Fix it]
D --> B
\`\`\`
```

---

## 🔧 Configuration

### Theme Customization

Edit `tailwind.config.js` to customize themes:

```javascript
module.exports = {
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake', // Add custom themes
      'bumblebee',
    ],
  },
};
```

### Environment Variables

Create a `.env.local` file:

```env
# Optional: Add any API keys or configurations
NEXT_PUBLIC_APP_NAME=Markdown Render
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Style

- Follow the existing code style
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📸 Screenshots

<div align="center">

### 🌅 Light Mode

![Light Mode](https://via.placeholder.com/800x400/ffffff/000000?text=Light+Mode+Screenshot)

### 🌙 Dark Mode

![Dark Mode](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dark+Mode+Screenshot)

### 📱 Mobile View

![Mobile View](https://via.placeholder.com/400x600/f0f0f0/000000?text=Mobile+View)

</div>

---

## 🐛 Known Issues

- [ ] Large files (>1MB) may cause performance issues
- [ ] Some complex Mermaid diagrams might need manual adjustment
- [ ] PDF export styling may vary across browsers

---

## 🗺️ Roadmap

### 🔮 Upcoming Features

- [ ] **Real-time Collaboration** - Multi-user editing support
- [ ] **Plugin System** - Custom markdown extensions
- [ ] **Cloud Storage** - Integration with Google Drive, Dropbox
- [ ] **Version Control** - Git-like versioning for documents
- [ ] **Advanced Search** - Full-text search across documents
- [ ] **Template Library** - Pre-built markdown templates
- [ ] **Export Options** - Word, HTML, and other formats

### 🎯 Long-term Goals

- [ ] **Desktop App** - Electron-based desktop application
- [ ] **Mobile App** - React Native mobile application
- [ ] **API Integration** - RESTful API for external integrations
- [ ] **Enterprise Features** - Team management and permissions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Anirban Saha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - For the amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[DaisyUI](https://daisyui.com/)** - For the beautiful component library
- **[Markdown Community](https://www.markdownguide.org/)** - For the fantastic markup language
- **[All Contributors](https://github.com/TheFastest599/markdown-render/graphs/contributors)** - For making this project better

---

<div align="center">

### 💫 Star this repository if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/TheFastest599/markdown-render?style=social)](https://github.com/TheFastest599/markdown-render/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/TheFastest599/markdown-render?style=social)](https://github.com/TheFastest599/markdown-render/network/members)

**Made with ❤️ by [Anirban Saha](https://github.com/TheFastest599)**

</div>

---

## 📞 Support

- 📧 **Email**: [your-email@example.com](mailto:your-email@example.com)
- 🐦 **Twitter**: [@TheFastest599](https://twitter.com/TheFastest599)
- 💼 **LinkedIn**: [Anirban Saha](https://linkedin.com/in/your-profile)
- 🌐 **Website**: [your-website.com](https://your-website.com)

---

<div align="center">

**⭐ Don't forget to give this project a star! ⭐**

</div>
