'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';

function Drawer() {
  const { contents, setSelectedId, selectedId, removeContent } =
    useGlobalStore();

  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="bg-base-200 text-base-content min-h-full w-80 p-2">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <Link href="/">
              <h1 className="text-xl font-bold cursor-pointer hover:text-primary transition-colors px-4 py-2">
                Markdown Render
              </h1>
            </Link>
            <label
              className="btn btn-square btn-ghost btn-lg"
              htmlFor="my-drawer"
              aria-label="close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </label>
          </div>
          {/* Content List */}
          {Object.keys(contents).length > 0 ? (
            <ul className="menu bg-base-200 rounded-box w-full">
              <li>
                <h2 className="menu-title">Contents</h2>
                <ul className="max-h-96 overflow-y-auto">
                  {Object.entries(contents).map(([id, item]) => (
                    <li key={id}>
                      <Link
                        href={`/${id}`}
                        className={`flex justify-between ${
                          id === pathname?.split('/')[1] ? 'menu-active' : ''
                        }`}
                        onClick={() => {
                          setSelectedId(id);
                        }}
                      >
                        <span className="truncate flex-1">{item.name}</span>
                        <span className="flex-none">
                          <button
                            className="btn btn-square btn-ghost btn-xs"
                            onClick={e => {
                              e.stopPropagation();
                              removeContent(id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="inline-block h-4 w-4 stroke-current"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg">No content present.</p>
              <p className="text-sm">Please select or add content to view.</p>
            </div>
          )}
          {/* Action */}
          <div className="flex flex-col items-center mt-6">
            <button
              className="btn btn-wide"
              onClick={() => {
                document.getElementById('add_content_modal').showModal();
                trackEvent('Add Content', 'Engagement');
              }}
            >
              Add Content
            </button>
            <Link
              href="/aboutus"
              className="text-sm mt-2 text-gray-500 hover:underline hover:text-gray-700"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
