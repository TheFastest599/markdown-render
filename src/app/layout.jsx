import { Poppins } from 'next/font/google';
import Layout from '@/components/Layout';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const metadata = {
  title: 'Markdown Render - Simple Markdown Reader for Notes, Docs & Math',
  description:
    'A simple Markdown reader for developers and students. Load and read Markdown notes, study materials, documentation, and research papers in one place. Fix broken AI math exports with perfect KaTeX rendering, syntax highlighting, mermaid diagrams, and persistent reading sessions.',
  keywords:
    'markdown reader, markdown viewer, markdown notes, note reader app, notes app, student notes, study materials, research papers, documentation reader, code documentation, developer tools, markdown library, markdown collection, persistent reading, offline reading, AI math rendering, broken AI math export fix, KaTeX, LaTeX, syntax highlighting, code blocks, mermaid diagrams, scientific papers, technical notes, programming notes, academic notes, pdf export, open source markdown viewer',
  author: 'Anirban Saha',
  creator: 'Anirban Saha',
  openGraph: {
    title: 'Markdown Render - Markdown Reader for Notes, Docs & Math',
    description:
      'Read Markdown notes, study docs, developer files, and research papers in one organized library. Fix broken AI math exports, render formulas with KaTeX, highlight code, and view mermaid diagrams.',
    url: 'https://markdownrender.vercel.app/', // Ensure this points to your home page
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://markdownrender.vercel.app/opengraph.jpg', // Add an Open Graph image for better previews
        alt: 'Markdown Render - Markdown Reader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Render - Markdown Reader for Notes & Docs',
    description:
      'Markdown reader for developers and students. Read notes, docs, and math with KaTeX support, syntax highlighting, mermaid diagrams, and broken AI math export fixes.',
    creator: '@TheFastest599',
    images: ['https://markdownrender.vercel.app/twitter.jpg'], // Add a Twitter-specific image
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
