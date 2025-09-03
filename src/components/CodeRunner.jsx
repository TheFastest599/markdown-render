import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

function extractText(children) {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (typeof children === 'object' && 'props' in children) {
    return extractText(children.props.children);
  }
  return '';
}

const CodeRenderer = ({ inline, className = '', children, ...props }) => {
  // Extract first language (from "language-python code-highlight")
  const langMatch = className.match(/language-([\w-]+)/);
  const language = langMatch ? langMatch[1] : '';
  const code = extractText(children).trim();

  // ✅ Inline code
  if (!language) {
    return (
      <code
        className="px-1 py-0.5 rounded font-mono text-sm bg-base-200 text-secondary"
        {...props}
      >
        {children}
      </code>
    );
  }

  // ✅ Mermaid diagrams
  const isMermaid =
    language === 'mermaid' ||
    code.startsWith('graph ') ||
    code.startsWith('flowchart') ||
    code.startsWith('sequenceDiagram') ||
    code.startsWith('classDiagram') ||
    code.startsWith('pie');

  if (isMermaid) {
    const [svg, setSvg] = useState('');

    useEffect(() => {
      mermaid.initialize({ startOnLoad: false, theme: 'default' });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid
        .render(id, code)
        .then(({ svg }) => setSvg(svg))
        .catch(err => {
          console.error('Mermaid render error:', err);
          setSvg(`<pre>Error rendering Mermaid: ${err.message}</pre>`);
        });
    }, [code]);

    return (
      <div
        className="my-4 bg-base-200 text-base-content rounded-lg p-2"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // ✅ Graphviz/DOT diagrams
  if (language === 'dot' || language === 'graphviz') {
    const [svg, setSvg] = useState('');

    useEffect(() => {
      let fixedCode = code;

      // Auto-fix: undirected graphs must use "--"
      if (fixedCode.startsWith('graph') && fixedCode.includes('->')) {
        fixedCode = fixedCode.replace(/->/g, '--');
      }

      const viz = new Viz({ Module, render });
      viz
        .renderSVGElement(fixedCode)
        .then(el => setSvg(el.outerHTML))
        .catch(err => {
          console.error('Graphviz render failed:', err);
          setSvg(`<pre>Error rendering DOT: ${err.message}</pre>`);
        });
    }, [code]);

    return (
      <div
        className="my-4 p-4 rounded-lg shadow bg-base-200 text-base-content"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // ✅ Default: Prism-highlighted code
  return (
    <div className="my-0">
      <span className="text-xs block">{language}</span>
      <pre
        className={`rounded-lg overflow-x-auto font-mono text-sm bg-base-200 text-base-content ${className}`}
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeRenderer;
