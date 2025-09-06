'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import OptionButton from '@/components/OptionButton';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';
import { useReactToPrint } from 'react-to-print';

export default function Home() {
  const {
    contents,
    selectedId,
    loadExampleContent,
    toggleLoading,
    theme,
    printRef,
  } = useGlobalStore();

  const selectedContent = contents.find(c => c.id === selectedId);

  const printRefVar = useRef();
  useEffect(() => {
    useGlobalStore.setState({ printRef: printRefVar });
    return () => useGlobalStore.setState({ printRef: null });
  }, [printRefVar]);

  // Update document title based on selected content
  useEffect(() => {
    if (selectedContent) {
      document.title = `${selectedContent.name} - Markdown Render`;
    } else {
      document.title = 'Markdown Render';
    }
  }, [selectedContent]);

  // Instead of content: () => printRef.current
  const handlePrint = useReactToPrint({
    content: () => printRef.current,

    contentRef: printRef,
    documentTitle: selectedContent?.name?.split('.')[0] || 'Document',
    removeAfterPrint: false,
  });

  // Hijack Ctrl+P to use custom print
  useEffect(() => {
    const onKeyDown = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        // if (theme === 'night') {
        //   alert('Please switch to Light theme before printing.');
        //   return;
        // }
        handlePrint();
        trackEvent('Print to PDF', 'Engagement');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrint, theme]);

  return (
    <div className="App  text-sm sm:text-base lg:text-lg">
      <main className="max-w-6xl px-6 mx-auto">
        {selectedContent && (
          <>
            <div className="flex justify-between">
              <div className="breadcrumbs text-sm">
                <ul>
                  <li>
                    <a>Content</a>
                  </li>
                  <li>
                    <a>{selectedContent.name}</a>
                  </li>
                </ul>
              </div>
              {/* Print Button */}
              <button
                className="btn btn-sm btn-circle btn-ghost tooltip tooltip-bottom"
                data-tip="Print to PDF"
                onClick={() => {
                  // if (theme === 'night') {
                  //   alert('Please switch to Light theme before printing.');
                  //   return;
                  // }
                  handlePrint();
                  trackEvent('Print to PDF', 'Engagement');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6,9 6,2 18,2 18,9"></polyline>
                  <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
                  <polyline points="6,14 18,14 18,22 6,22 6,14"></polyline>
                </svg>
              </button>
            </div>
            {/* Print Preview */}
            {/* Markdown Render */}
            <OptionButton />
            <div
              ref={printRef}
              className="prose max-w-none print-transform"
              data-date={new Date().toLocaleDateString()}
              data-name={selectedContent.name}
            >
              <MarkdownRenderer content={selectedContent.content} />
            </div>
          </>
        )}
        {!selectedContent && (
          <div className="flex flex-col items-center justify-center min-h-[83vh] text-center text-gray-500">
            <p className="text-lg">No content selected.</p>
            <p className="text-sm">Please select or add content to view.</p>
            <div className="flex flex-col gap-2 items-center justify-center w-60 mt-6">
              <button
                className="btn btn-wide "
                onClick={() => {
                  document.getElementById('add_content_modal').showModal();
                  trackEvent('Add Content', 'Engagement');
                }}
              >
                Add Content
              </button>
              <button
                className="btn btn-wide btn-soft btn-info "
                onClick={loadExampleContent}
              >
                Load Example Content
              </button>
              <Link
                href="/aboutus"
                className="text-sm mt-2 text-gray-500 hover:underline hover:text-gray-700"
              >
                About Us
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
