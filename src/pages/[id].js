import React, { useEffect, useRef, Suspense, lazy, useMemo } from 'react';
import 'katex/dist/katex.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OptionButton from '@/components/OptionButton';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';
import { useReactToPrint } from 'react-to-print';

const MarkdownRenderer = lazy(() => import('@/components/MarkdownRenderer'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[75vh] bg-base-100">
    <div className="text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-4 text-gray-500">Loading your content...</p>
    </div>
  </div>
);

export default function ContentPage() {
  const router = useRouter();
  const { id } = router.query;
  const { contents, theme, printRef, setSelectedId, showToast } =
    useGlobalStore();

  // Memoize the selected content to avoid unnecessary recalculations
  const selectedContent = useMemo(() => contents[id], [contents, id]);

  useEffect(() => {
    // if (id && !selectedContent) {
    //   // If id is invalid, reset selectedId to null
    //   showToast('Content not found. Redirecting to home.', 'error');
    //   router.push('/');
    //   setSelectedId(null);
    // }

    if (id && selectedContent) {
      setSelectedId(id);
    }
  }, [id, selectedContent]);

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
    ignoreGlobalStyles: false,
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
    <main className="App text-sm sm:text-base max-w-6xl px-6 mx-auto overflow-x-hidden">
      <div className="flex justify-between">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Content</a>
            </li>
            <li>
              <Link href={`/${id}`}>{selectedContent.name}</Link>
            </li>
          </ul>
        </div>

        <div>
          {/* Edit Button */}
          <Link
            className="btn btn-sm btn-circle btn-ghost tooltip tooltip-bottom"
            data-tip="Edit"
            href={`/edit/${id}`}
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </Link>
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
      </div>
      <OptionButton />
      <div
        ref={printRef}
        className="prose max-w-none print-transform"
        data-date={new Date().toLocaleDateString()}
        data-name={selectedContent.name}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <MarkdownRenderer content={selectedContent.content} />
        </Suspense>
      </div>
    </main>
  );
}
