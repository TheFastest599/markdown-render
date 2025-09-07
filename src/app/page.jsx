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
    <main className="flex flex-col items-center justify-center min-h-[83vh] text-base-content/60 px-4">
      {/* Tagline */}
      <header>
        <h1 className="text-lg my-6 sm:text-xl md:text-2xl font-medium text-center">
          “A Markdown reader for notes, docs, and math - built for devs &
          students.”
        </h1>
        <p className="text-sm text-center">
          Please select or add content to view.
        </p>
      </header>
      {/* Buttons */}
      <section className="flex flex-col gap-2 items-center justify-center w-60 mt-2">
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

        {/* <Link href="/aboutus" className="text-sm mt-2  hover:underline">
          About Us
        </Link> */}
      </section>
      {/* Content List */}
      <section className="flex justify-center w-full max-w-xl px-2 sm:px-0 mt-4">
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
            No contents available. Please add content...
          </p>
        )}
      </section>

      {/* Accordion */}
      <section className="join join-vertical bg-base-100 w-full max-w-xl mt-2">
        {/* Accordion Item 1 */}
        <div className="collapse join-item border border-base-300">
          <input type="radio" name="my-accordion-4" id="accordion-1" />
          <label
            htmlFor="accordion-1"
            className="collapse-title font-semibold text-xs flex justify-between items-center"
          >
            <span>What is Markdown Render?</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </label>
          <div className="collapse-content text-xs">
            Markdown Render is a dedicated markdown reader designed for
            developers and researchers. It allows you to load, read, and manage
            markdown notes, documentation, and research papers with features
            like KaTeX math rendering, syntax highlighting, and persistent
            storage.
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className="collapse join-item border border-base-300">
          <input type="radio" name="my-accordion-4" id="accordion-2" />
          <label
            htmlFor="accordion-2"
            className="collapse-title font-semibold text-xs flex justify-between items-center"
          >
            <span>What features does it offer?</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </label>
          <div className="collapse-content text-xs">
            Markdown Render offers a clean reading interface, KaTeX support for
            math formulas, syntax highlighting for code, mermaid diagrams,
            persistent reading sessions, and the ability to export notes to PDF
            for offline reading or sharing.
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div className="collapse join-item border border-base-300">
          <input type="radio" name="my-accordion-4" id="accordion-3" />
          <label
            htmlFor="accordion-3"
            className="collapse-title font-semibold text-xs flex justify-between items-center"
          >
            <span>How do I get started?</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </label>
          <div className="collapse-content text-xs">
            To get started, click "Add Content" to upload your markdown files or
            "Load Example Content" to see how it works. You can also explore the
            "About Us" page to learn more about the app's features and use
            cases.
          </div>
        </div>
      </section>

      <Link href="/aboutus" className="text-sm mt-4  hover:underline">
        About Us
      </Link>
    </main>
  );
}
