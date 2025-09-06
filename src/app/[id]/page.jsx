'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import OptionButton from '@/components/OptionButton';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';
import { useReactToPrint } from 'react-to-print';

export default function ContentPage() {
  const router = useRouter();
  const { id } = useParams();
  const { contents, theme, printRef, setSelectedId, showToast } =
    useGlobalStore();

  const selectedContent = contents.find(c => c.id === id);
  useEffect(() => {
    if (id && !selectedContent) {
      // If id is invalid, reset selectedId to null
      showToast('Content not found. Redirecting to home.', 'error');
      router.push('/');
      setSelectedId(null);
    }

    if (id && selectedContent) {
      setSelectedId(id);
    }
  }, [id]);

  const printRefVar = useRef();
  useEffect(() => {
    useGlobalStore.setState({ printRef: printRefVar });
    return () => useGlobalStore.setState({ printRef: null });
  }, [printRefVar]);

  useEffect(() => {
    if (selectedContent) {
      document.title = `${selectedContent.name} - Markdown Render`;
    } else {
      document.title = 'Markdown Render';
    }
  }, [selectedContent]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    contentRef: printRef,
    documentTitle: selectedContent?.name?.split('.')[0] || 'Document',
    removeAfterPrint: false,
  });

  useEffect(() => {
    const onKeyDown = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handlePrint();
        trackEvent('Print to PDF', 'Engagement');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrint, theme]);

  if (!selectedContent) {
    // Optionally redirect to "/" or show a not found message
    return (
      <div className="flex flex-col items-center justify-center min-h-[83vh] text-center text-gray-500">
        <p className="text-lg">Content not found.</p>
        <Link href="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="App text-sm sm:text-base lg:text-lg">
      <main className="max-w-6xl px-6 mx-auto">
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
        <OptionButton />
        <div
          ref={printRef}
          className="prose max-w-none print-transform"
          data-date={new Date().toLocaleDateString()}
          data-name={selectedContent.name}
        >
          <MarkdownRenderer content={selectedContent.content} />
        </div>
      </main>
    </div>
  );
}
