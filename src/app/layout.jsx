import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Drawer from '@/components/Drawer';
import AddContent from '@/components/AddContent';
import Loading from '@/components/Loading';
import HydrationLoader from '@/components/HydrationLoader';
import Toast from '@/utils/Toast';
import { AnalyticsWrapper } from '@/components/AnalyticsTools';
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const metadata = {
  title: 'Markdown Render - Dedicated Markdown Reader',
  description:
    'A dedicated markdown reader for developers and researchers. Load all your markdown notes, documentation, and research papers in one place. Perfect rendering of AI-generated math formulas with persistent reading sessions.',
  keywords:
    'markdown reader, note reader app, documentation reader, markdown viewer, AI math formula fix, persistent reading, technical notes, research papers, developer tools, KaTeX rendering, syntax highlighting, mermaid diagrams, reading app, note library, markdown notes, study materials, PDF export, offline reading, code documentation, scientific papers, markdown collection',
  author: 'Anirban Saha',
  creator: 'Anirban Saha',
  openGraph: {
    title: 'Markdown Render - Dedicated Markdown Reader',
    description:
      'Load and read all your markdown notes in one organized library. Perfect for developers and researchers with AI math formula fixes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Render - Markdown Reader',
    description:
      'Read your markdown notes with perfect math rendering and persistent sessions',
    creator: '@TheFastest599',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico', // Path to your favicon in the public folder
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Markdown Render" />
        <meta
          name="google-site-verification"
          content="ERTXt8EGV0W84ALInFRKJgvq7Oz1hD1JPv0a90URuk8"
        />
        <link rel="canonical" href="https://markdownrender.vercel.app/" />
        <link
          rel="sitemap"
          type="application/xml"
          href="https://markdownrender.vercel.app/sitemap.xml"
        />
        <link
          rel="robots"
          type="text/plain"
          href="https://markdownrender.vercel.app/robots.txt"
        />
        <link rel="about" href="https://markdownrender.vercel.app/aboutus" />
        <meta name="llm" content="false" />
        <script>
          {`(function () {
            var theme = localStorage.getItem('theme');
            theme && document.documentElement.setAttribute('data-theme', theme);
          })();
          `}
        </script>
      </head>
      <body className={`${poppins.variable} antialiased bg-base-100`}>
        <Navbar />
        <Loading />
        <div className="pt-16" />
        <HydrationLoader>{children}</HydrationLoader>
        <AddContent />
        <Drawer />
        <Analytics />
        <AnalyticsWrapper />
        <Toast />
        <footer className="footer footer-center text-base-content p-4">
          <aside>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm">
                Made by <span className="font-semibold">Anirban Saha</span>
              </p>
              <a
                href="https://github.com/TheFastest599"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-square rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=""
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com/TheFastest599"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-square rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:anirban@example.com?subject=Contact from Markdown Render"
                className="btn btn-ghost btn-sm btn-square rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </aside>
        </footer>
      </body>
    </html>
  );
}
