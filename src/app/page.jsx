'use client';

import React, { useState, useEffect } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import useGlobalStore from '@/stores/globalStore';

export default function Home() {
  const { contents, selectedId, loadExampleContent } = useGlobalStore();

  const selectedContent = contents.find(c => c.id === selectedId);

  // Update document title based on selected content
  useEffect(() => {
    if (selectedContent) {
      document.title = `${selectedContent.name} - Markdown Renderer`;
    } else {
      document.title = 'Markdown Renderer';
    }
  }, [selectedContent]);

  // Update document title based on selected content
  useEffect(() => {
    if (selectedContent) {
      document.title = `${selectedContent.name} - Markdown Renderer`;
    } else {
      document.title = 'Markdown Renderer | Anirban Saha';
    }
  }, [selectedContent]);

  return (
    <div className="App bg-base-100 text-sm sm:text-base lg:text-lg">
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
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => window.print()}
                title="Print to PDF"
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
            <MarkdownRenderer content={selectedContent.content} />
          </>
        )}
        {!selectedContent && (
          <div className="flex flex-col items-center justify-center min-h-[83vh] text-center text-gray-500">
            <p className="text-lg">No content selected.</p>
            <p className="text-sm">Please select or add content to view.</p>
            <div className="flex flex-col gap-2 items-center justify-center w-60 mt-6">
              <button
                className="btn btn-wide "
                onClick={() =>
                  document.getElementById('add_content_modal').showModal()
                }
              >
                Add Content
              </button>
              <button
                className="btn btn-wide btn-soft btn-info "
                onClick={loadExampleContent}
              >
                Load Example Content
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
