import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import rehypePrism from 'rehype-prism-plus';
// import 'prismjs/themes/prism.css';
// import 'github-markdown-css/github-markdown.css';

const preprocessMarkdown = content => {
  const rules = [
    // --- Your existing fixes ---
    [/\\\$/g, '$'], // \$ -> $
    [/\\\$\$/g, '$$'], // \$\$ -> $$
    [/\r\n/g, '\n'], // Normalize line endings
    [/\\\\([a-zA-Z])/g, '\\$1'], // \\alpha -> \alpha
    [/\$\s+/g, '$'], // Trim space after $
    [/\s+\$/g, '$'], // Trim space before $

    // --- AI-specific quirks ---
    [/\\min\*/g, '\\min_'], // \min* -> \min_
    [/\\max\*/g, '\\max_'], // \max* -> \max_
    [/\\\|([A-Za-z0-9]+)\\\|\*\*/g, '\\|$1\\|_*'], // \|X\|*\* -> \|X\|_*
    [/([A-Za-z0-9])\*\{([^}]*)\}/g, '$1_{$2}'], // X*{ij} -> X_{ij}
    [/\}\*/g, '}'], // ^{2}\* -> ^{2}
    [/\*\*\$(.*?)\$\*\*/g, '$$$1$$'], // **$...$** -> $$...$$
    [/\\([a-zA-Z]+)\*/g, '\\$1'], // \alpha\* -> \alpha
  ];

  return rules.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    content
  );
};

const MarkdownRenderer = ({ content }) => {
  const fixedContent = preprocessMarkdown(content);
  return (
    <div className="markdown-body  dark:prose-invert max-w-none p-6">
      <ReactMarkdown
        children={fixedContent}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          rehypeRaw,
          // [rehypePrism, { ignoreMissing: true }],
        ]}
      />
    </div>
  );
};

export default MarkdownRenderer;
