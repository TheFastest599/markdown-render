'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';

export default function Home() {
  const router = useRouter();
  const { loadExampleContent, contents, selectedId } = useGlobalStore();

  return (
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
          onClick={async () => {
            const newId = await loadExampleContent();
            if (newId) {
              router.push(`/${newId}`);
              trackEvent('Load Example Content', 'Engagement');
            }
          }}
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
      <div className="w-full max-w-xl px-4 sm:px-0 mt-4">
        {contents.length > 0 ? (
          <div className="flex flex-wrap gap-2 pb-2 justify-center sm:justify-start">
            {contents.slice(0, 10).map(content => (
              <Link
                key={content.id}
                href={`/${content.id}`}
                className="flex items-center gap-2 badge badge-xs shadow m-1 hover:underline whitespace-nowrap  transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    selectedId === content.id
                      ? 'text-blue-500'
                      : 'text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16V4a2 2 0 012-2h8a2 2 0 012 2v12M4 16l4 4m0 0l4-4m-4 4V10"
                  />
                </svg>
                <span className="truncate">{content.name}</span>
              </Link>
            ))}
            {/* Show "...and X more" on a new line if there are more than 10 */}
            {contents.length > 10 && (
              <div className="w-full text-xs text-gray-400 mt-2 text-center">
                ...and {contents.length - 10} more
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400">
            (No contents available. Please add content.)
          </p>
        )}
      </div>
    </div>
  );
}
