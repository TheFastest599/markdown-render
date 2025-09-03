import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import rehypePrism from 'rehype-prism-plus';
import CodeRenderer from './CodeRunner';
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

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-body  dark:prose-invert max-w-6xl px-6 mx-auto">
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
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
