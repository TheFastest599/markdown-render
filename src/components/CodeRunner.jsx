import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';
import { graphviz } from 'd3-graphviz';
import AutoLinkText from './AutoLinkText';

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

  // ✅ Inline code
  if (!language) {
    return (
      <code
        className="px-1 py-0.5 rounded font-mono text-sm bg-base-200 text-secondary overflow-x-auto print:overflow-hidden print:whitespace-pre-wrap print:break-inside-avoid"
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
    const [error, setError] = useState(null);

    useEffect(() => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        suppressErrorRendering: true,
      });
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid
        .render(id, code)
        .then(({ svg }) => setSvg(svg))
        .catch(err => {
          setSvg('');
          setError(err);
          console.error('Mermaid render error:', err, code, language);
        });
      // mermaid
      //   .render(id, code)
      //   .then(({ svg }) => {
      //     // Make SVG responsive to fit container without clipping
      //     const responsiveSvg = svg.replace(
      //       '<svg',
      //       '<svg style="width: auto; height: auto; max-width: 100%; max-height: 40%;"'
      //     );
      //     setSvg(responsiveSvg);
      //   })
      //   .catch(err => {
      //     setSvg('');
      //     setError(err);
      //     console.error('Mermaid render error:', err, code, language);
      //   });
    }, [code]);

    return !error ? (
      <div
        className="my-4 bg-base-200 text-base-content overflow-x-hidden rounded-lg p-2 sm:p-4"
        data-theme="light"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    ) : (
      <div className="my-0 ">
        <span className="text-xs block">{language}</span>
        <pre
          className={`rounded-lg overflow-x-auto font-mono bg-base-200 text-base-content print:overflow-hidden print:whitespace-pre-wrap print:break-inside-avoid ${className}`}
        >
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
        <p className="text-xs text-red-500 p-1">
          Error rendering Mermaid diagram!!
        </p>
      </div>
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
          .then(el => {
            // Make SVG responsive to fit container without clipping
            const svgString = el.outerHTML;
            const responsiveSvg = svgString.replace(
              '<svg',
              '<svg style="width: auto; height: auto; max-width: 100%; max-height: 85vh;"'
            );
            setSvg(responsiveSvg);
          })
          .catch(err => {
            console.error('Graphviz render failed:', err);
            setSvg(`<pre>Error rendering DOT diagram</pre>`);
          });
      }
    }, [code]);

    return (
      <div
        className="bg-base-200 text-base-content overflow-x-hidden rounded-lg p-2 sm:p-4"
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
        className={`rounded-lg overflow-x-auto font-mono bg-base-200 text-base-content print:overflow-hidden print:whitespace-pre-wrap print:break-inside-avoid ${className}`}
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeRenderer;
