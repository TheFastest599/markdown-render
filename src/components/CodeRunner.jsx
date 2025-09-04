import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';
import { graphviz } from 'd3-graphviz';

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
  const langMatch = className.match(/language-([\w-]+)/);
  const language = langMatch ? langMatch[1] : '';
  const code = extractText(children).trim();
  const containerRef = useRef(null);

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

  // ✅ Detect Mermaid diagrams safely
  const isMermaid =
    language === 'mermaid' ||
    // Only auto-detect if NOT dot/graphviz
    (language !== 'dot' &&
      language !== 'graphviz' &&
      (code.startsWith('graph ') ||
        code.startsWith('flowchart') ||
        code.startsWith('sequenceDiagram') ||
        code.startsWith('classDiagram') ||
        code.startsWith('erDiagram') ||
        code.startsWith('gantt') ||
        code.startsWith('journey') ||
        code.startsWith('pie')));

  if (isMermaid) {
    const [svg, setSvg] = useState('');

    useEffect(() => {
      mermaid.initialize({ startOnLoad: false, theme: 'default' });
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid
        .render(id, code)
        .then(({ svg }) => setSvg(svg))
        .catch(err =>
          console.error('Mermaid render error:', err, code, language)
        );
    }, [code]);

    return (
      <div
        className="my-4 bg-base-200 text-base-content  overflow-x-auto rounded-lg p-2 sm:p-4"
        data-theme="light"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // ✅ DOT / Graphviz
  if (language === 'dot' || language === 'graphviz') {
    const [svg, setSvg] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
      const engineMatch = code.match(/layout\s*=\s*(\w+);?/i);
      const engine = engineMatch ? engineMatch[1].toLowerCase() : 'dot';

      if (['neato', 'fdp', 'sfdp', 'circo'].includes(engine)) {
        // Use d3-graphviz
        if (containerRef.current) {
          containerRef.current.innerHTML = ''; // Clear old render
          graphviz(containerRef.current, {
            useWorker: false, // Important for Vite/CRA bundlers
            engine, // Tell graphviz which layout to use
          }).renderDot(code);
        }
      } else {
        // Use viz.js for normal DOT
        const viz = new Viz({ Module, render });
        viz
          .renderSVGElement(code)
          .then(el => setSvg(el.outerHTML))
          .catch(err => {
            console.error('Graphviz render failed:', err);
            setSvg(`<pre>Error rendering DOT: ${err.message}</pre>`);
          });
      }
    }, [code]);

    return (
      <div
        className=" bg-base-200 text-base-content overflow-x-auto rounded-lg p-2 sm:p-4"
        data-theme="light"
      >
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div ref={containerRef} />
        )}
      </div>
    );
  }

  // ✅ Default code
  return (
    <div className="my-0 ">
      <span className="text-xs block">{language}</span>
      <pre
        className={`rounded-lg overflow-x-auto font-mono  bg-base-200 text-base-content ${className}`}
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeRenderer;
