import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Markdown Render',
  description:
    'Learn about Markdown Render - a dedicated markdown reader designed for developers and researchers. Load all your markdown notes, fix AI-generated math formulas, and enjoy seamless reading with persistent storage.',
  keywords:
    'about markdown render, markdown reader app, developer tools, AI math formula fix, note reading app, markdown viewer, documentation reader, technical notes, research papers, persistent storage, KaTeX rendering, syntax highlighting, mermaid diagrams, PDF export',
  openGraph: {
    title: 'About Markdown Render - Dedicated Markdown Reader',
    description:
      'Discover how Markdown Render helps developers and researchers read their markdown notes with perfect math rendering and organized file management.',
    type: 'website',
    url: '/aboutus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Markdown Render - Dedicated Markdown Reader',
    description:
      'A focused reading app for markdown notes with AI math formula fixes and persistent storage.',
  },
  robots: 'index, follow',
  canonical: '/aboutus',
};

export default function AboutUs() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
            Markdown Render
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            A dedicated markdown reader designed for developers and researchers.
            Load all your markdown notes, documentation, and articles in one
            place for seamless reading with perfect rendering of math formulas
            and diagrams.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="badge badge-neutral">📖 Reading Focused</div>
            <div className="badge badge-neutral">📚 Note Library</div>
            <div className="badge badge-neutral">💾 Persistent</div>
            <div className="badge badge-neutral">🔧 Developer Tools</div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">
                � Dedicated Reading Experience
              </h2>
              <p className="text-base-content/80 mb-4">
                Designed specifically for reading markdown content. Clean,
                distraction-free interface that lets you focus on your notes and
                documentation with optimal typography and spacing.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">Clean Reader</div>
                <div className="badge badge-outline">Focused UI</div>
                <div className="badge badge-outline">Readable Fonts</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">
                📚 Your Personal Note Library
              </h2>
              <p className="text-base-content/80 mb-4">
                Load all your markdown notes, research papers, documentation,
                and articles in one organized library. Switch between files
                instantly and keep your reading session persistent.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">Note Collection</div>
                <div className="badge badge-outline">Quick Switch</div>
                <div className="badge badge-outline">Organized</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">
                🛠️ Perfect for AI-Generated Content
              </h2>
              <p className="text-base-content/80 mb-4">
                Reading AI-generated notes with broken math formulas? Our
                advanced KaTeX rendering engine fixes corrupted LaTeX and
                ensures every mathematical expression displays perfectly in your
                reading session.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">LaTeX Support</div>
                <div className="badge badge-outline">Error Correction</div>
                <div className="badge badge-outline">Perfect Rendering</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">
                💾 Never Lose Your Reading Progress
              </h2>
              <p className="text-base-content/80 mb-4">
                Your reading session is automatically saved. Come back anytime
                to continue reading exactly where you left off. All your loaded
                notes remain accessible between sessions.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">Auto-Save</div>
                <div className="badge badge-outline">Session Restore</div>
                <div className="badge badge-outline">Reading Progress</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">🖨️ Share Your Reading</h2>
              <p className="text-base-content/80 mb-4">
                Export your beautifully rendered notes to PDF for sharing or
                archiving. Perfect for research papers, documentation, or study
                materials that you want to read offline.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">PDF Export</div>
                <div className="badge badge-outline">Offline Reading</div>
                {/* <div className="badge badge-outline">Share Notes</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Reading Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Enhanced Reading Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">📐 Mathematical Content</h3>
                <p className="text-sm text-base-content/70">
                  Read research papers and technical notes with perfect LaTeX
                  math rendering.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">💻 Code Documentation</h3>
                <p className="text-sm text-base-content/70">
                  Read technical documentation with beautiful syntax
                  highlighting for 200+ programming languages.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">📊 Visual Diagrams</h3>
                <p className="text-sm text-base-content/70">
                  View flowcharts, sequence diagrams, and architectural diagrams
                  directly in your reading session.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">🌐 Network Diagrams</h3>
                <p className="text-sm text-base-content/70">
                  Read documentation with complex network diagrams and graphs
                  using Graphviz DOT language.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">🎨 Rich Content</h3>
                <p className="text-sm text-base-content/70">
                  Read notes with embedded HTML elements for rich, interactive
                  content when needed.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-2">📝 Standard Markdown</h3>
                <p className="text-sm text-base-content/70">
                  Read GitHub Flavored Markdown with tables, task lists, and all
                  standard formatting for documentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card bg-base-200 shadow-sm mb-16">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-8">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Next.js 14</span>
                    <div className="badge badge-neutral badge-sm">
                      Framework
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>React 18</span>
                    <div className="badge badge-neutral badge-sm">
                      UI Library
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Tailwind CSS</span>
                    <div className="badge badge-neutral badge-sm">Styling</div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>DaisyUI</span>
                    <div className="badge badge-neutral badge-sm">
                      Components
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Markdown Processing
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>react-markdown</span>
                    <div className="badge badge-neutral badge-sm">Core</div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>KaTeX</span>
                    <div className="badge badge-neutral badge-sm">Math</div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Prism.js</span>
                    <div className="badge badge-neutral badge-sm">Syntax</div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Mermaid</span>
                    <div className="badge badge-neutral badge-sm">Diagrams</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">
                Start Reading Your Notes
              </h2>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Ready to organize and read all your markdown notes in one place?
                Load your files and start your focused reading session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link className="btn btn-primary" href="/">
                  📖 Start Reading
                </Link>
                <a
                  href="https://github.com/TheFastest599/markdown-render"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">200+</div>
            <div className="text-sm text-base-content/60">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">10+</div>
            <div className="text-sm text-base-content/60">Diagram Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">&lt;1s</div>
            <div className="text-sm text-base-content/60">Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">100%</div>
            <div className="text-sm text-base-content/60">Free</div>
          </div>
        </div>
      </div>
    </main>
  );
}
