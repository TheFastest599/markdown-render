import Layout from '@/components/Layout';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${poppins.variable} antialiased bg-base-100`}>
      <Head>
        <title>
          Markdown Render - Simple Markdown Reader for Notes, Docs & Math
        </title>
        <meta
          name="description"
          content="A simple Markdown reader for developers and students. Load and read Markdown notes, study materials, documentation, and research papers in one place. Fix broken AI math exports with perfect KaTeX rendering, syntax highlighting, mermaid diagrams, and persistent reading sessions."
        />
        <meta
          name="keywords"
          content="markdown reader, markdown viewer, markdown notes, note reader app, notes app, student notes, study materials, research papers, documentation reader, code documentation, developer tools, markdown library, markdown collection, persistent reading, offline reading, AI math rendering, broken AI math export fix, KaTeX, LaTeX, syntax highlighting, code blocks, mermaid diagrams, scientific papers, technical notes, programming notes, academic notes, pdf export, open source markdown viewer"
        />
        <meta name="author" content="Anirban Saha" />
        <meta name="creator" content="Anirban Saha" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
        <style>
          {`
    body {
      font-family: 'Poppins', sans-serif !important;
    }
  `}
        </style>
        <script>
          {`(function () {
            var theme = localStorage.getItem('theme');
            theme && document.documentElement.setAttribute('data-theme', theme);
          })();`}
        </script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
