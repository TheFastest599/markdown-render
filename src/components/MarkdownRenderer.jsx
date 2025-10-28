import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypePrism from 'rehype-prism-plus';
import CodeRenderer from '@/components/CodeRunner';
import Link from 'next/link';
// import 'prismjs/themes/prism.css';
// import 'github-markdown-css/github-markdown.css';

function fixMath(content) {
  let fixed = content;

  // 1. Fix AI-style inline math inside bold (**\$ ... \$**)
  fixed = fixed.replace(
    /\*\*\\\$(.+?)\\\$\*\*/gs,
    (_, expr) => `**$${expr.trim()}$**`
  );

  // 2. Fix AI-style inline math inside italic (__\$ ... \$__)
  fixed = fixed.replace(
    /__\\\$(.+?)\\\$__/gs,
    (_, expr) => `__$${expr.trim()}$__`
  );

  // 3. Fix AI-style block math inside bold (**\$\$ ... \$\$**)
  fixed = fixed.replace(
    /\*\*\\\$\$(.+?)\\\$\$\*\*/gs,
    (_, expr) => `$$\n${expr.trim()}\n$$`
  );

  // 4. Fix normal escaped inline math (\$ ... \$)
  fixed = fixed.replace(/\\\$(.+?)\\\$/gs, (_, expr) => `$${expr.trim()}$`);

  // 5. Normalize block math (ensure $$ on its own line)
  fixed = fixed.replace(
    /\$\$\s*([\s\S]*?)\s*\$\$/g,
    (_, expr) => `\n$$\n${expr.trim()}\n$$\n`
  );

  // 6. Fix triple-dollar AI bug ($$$ ... $$$)
  fixed = fixed.replace(
    /\$\$\$([\s\S]*?)\$\$\$/g,
    (_, expr) => `\n$$\n${expr.trim()}\n$$\n`
  );

  // 7. Remove stray "math\n" prefixes from AI exports
  fixed = fixed.replace(/(^|\n)math\s*\n/g, '$1');

  return fixed;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with -
}
const NAVBAR_HEIGHT = 64;

const scrollToHash = () => {
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

const MarkdownRenderer = ({ content }) => {
  useEffect(() => {
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <div className="markdown-body  dark:prose-invert ">
      <ReactMarkdown
        children={fixMath(content)}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          rehypeRaw,
          [rehypePrism, { ignoreMissing: true }],
        ]}
        components={{
          // ✅ Render block math ($$ ... $$)
          // Custom heading renderer for h1-h6
          h1: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h1
                id={id}
                className="text-3xl sm:text-4xl font-bold mt-8 mb-4"
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="text-2xl sm:text-3xl font-semibold mt-7 mb-4"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="text-xl sm:text-2xl font-medium mt-6 mb-3"
                {...props}
              >
                {children}
              </h3>
            );
          },
          h4: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h4
                id={id}
                className="text-lg sm:text-xl font-medium mt-5 mb-3"
                {...props}
              >
                {children}
              </h4>
            );
          },
          h5: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h5
                id={id}
                className="text-base sm:text-lg font-medium mt-4 mb-2"
                {...props}
              >
                {children}
              </h5>
            );
          },
          h6: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children)
              .map(child => (typeof child === 'string' ? child : ''))
              .join('');
            const id = slugify(text);
            return (
              <h6
                id={id}
                className="text-base font-medium mt-3 mb-2"
                {...props}
              >
                {children}
              </h6>
            );
          },
          math({ value }) {
            return (
              <span className="math-block">
                {/* rehype-katex will handle rendering */}
                {value}
              </span>
            );
          },

          // ✅ Render inline math ($ ... $)
          inlineMath({ value }) {
            return <span className="math-inline">{value}</span>;
          },
          pre({ node, children, ...props }) {
            return (
              <pre className="overflow-x-auto print:overflow-hidden print:whitespace-pre-wrap print:break-inside-avoid">
                {children}
              </pre>
            );
          },
          // ✅ Your existing code renderer
          code({ node, inline, className, children, ...props }) {
            return (
              <CodeRenderer
                className={className}
                inline={inline}
                node={node}
                {...props}
              >
                {children}
              </CodeRenderer>
            );
          },
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>;
            // Anchor link: starts with #
            if (href.startsWith('#')) {
              return (
                <a href={href} className="underline" {...props}>
                  {children}
                </a>
              );
            }
            // External link: starts with http or https
            if (/^https?:\/\//.test(href)) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            // Internal page link (starts with /)
            return (
              <Link href={href} className="underline" {...props}>
                {children}
              </Link>
            );
          },
          table: ({ children, ...props }) => (
            <div
              className="overflow-x-auto max-h-[80vh] print:overflow-hidden print:max-h-none print:break-inside-avoid"
              {...props}
            >
              <table className="table table-sm sm:table-md table-zebra">
                {children}
              </table>
            </div>
          ),
          // img: ({ src, alt, style, ...props }) => (
          //   <span className="flex justify-center  my-4">
          //     <img
          //       className="rounded-lg w-full max-w-[80%] object-contain"
          //       src={src}
          //       alt={alt}
          //       style={style}
          //       {...props}
          //     />
          //   </span>
          // ),
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
