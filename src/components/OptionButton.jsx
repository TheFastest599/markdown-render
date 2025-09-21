import React from 'react';
import { useReactToPrint } from 'react-to-print';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';
import { useScroll } from '@/hooks/useScroll';
import Link from 'next/link';
import { useRouter } from 'next/router';

function OptionButton() {
  const { contents, selectedId, printRef } = useGlobalStore();

  const { scrollDirection } = useScroll();

  const router = useRouter();
  const { id } = router.query;

  // Use direct lookup for selected content
  const selectedContent = contents[selectedId];

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    contentRef: printRef,
    documentTitle: selectedContent?.name?.split('.')[0] || 'Document',
    removeAfterPrint: false,
  });

  return (
    <div
      className={`fab fixed bottom-16 right-16 transition-all duration-300 ${
        scrollDirection === 'up'
          ? 'translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* A focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-lg btn-circle btn-soft "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          className="w-7 h-7"
        >
          <path
            fill="currentColor"
            d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.03 7.03 0 00-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4a.5.5 0 00-.5.42l-.38 2.65c-.63.25-1.22.57-1.78.98l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.05.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65a.5.5 0 00-.12.64l2 3.46c.14.24.44.32.68.22l2.49-1c.53.41 1.11.74 1.74.99l.38 2.65c.05.28.28.48.5.48h4c.28 0 .45-.2.5-.48l.38-2.65c.63-.25 1.22-.57 1.78-.98l2.49 1c.24.1.54.02.68-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"
          />
        </svg>
      </div>

      {/* Close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
      <div className="fab-close">
        <span className="badge shadow-sm">Close</span>{' '}
        <span className="btn btn-circle btn-lg btn-soft">✕</span>
      </div>
      {/* New Edit Button */}
      <div>
        <span className="badge shadow-sm">Edit</span>{' '}
        <Link className="btn btn-lg btn-circle" href={`/edit/${id}`}>
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
      </div>

      {/* Buttons that show up when FAB is open */}
      <div>
        <span className="badge shadow-sm">Add Content</span>{' '}
        <button
          className="btn btn-lg btn-circle"
          onClick={() => {
            document.getElementById('add_content_modal').showModal();
            trackEvent('Add Content', 'Engagement');
          }}
        >
          +
        </button>
      </div>
      <div>
        <span className="badge shadow-sm">Print to PDF</span>{' '}
        <button className="btn btn-lg btn-circle" onClick={handlePrint}>
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
  );
}

export default OptionButton;
