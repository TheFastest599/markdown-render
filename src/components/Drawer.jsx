'use client';

import React from 'react';
import useGlobalStore from '@/stores/globalStore';

function Drawer() {
  const { contents, selectedId, setSelectedId, removeContent } =
    useGlobalStore();
  const selectedContent = contents.find(c => c.id === selectedId);
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className=" bg-base-200 text-base-content min-h-full w-80 p-2">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <a className="btn btn-ghost btn-lg">Markdown Renderer</a>
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
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>{' '}
              </svg>
            </label>
          </div>
          {/* Content List */}
          {contents.length > 0 && (
            <ul className="menu bg-base-200 rounded-box w-full">
              <li>
                <h2 className="menu-title">Contents</h2>
                <ul className="max-h-96 overflow-y-auto">
                  {contents.map(item => (
                    <li key={item.id}>
                      <a
                        className={`flex justify-between  ${
                          selectedId === item.id ? 'menu-active' : ''
                        }`}
                        onClick={() => {
                          if (selectedId !== item.id) {
                            setSelectedId(item.id);
                          } else {
                            setSelectedId(null);
                          }
                        }}
                      >
                        <span className="truncate flex-1">{item.name}</span>
                        <span className="flex-none">
                          <button
                            className="btn btn-square btn-ghost  btn-xs"
                            onClick={() => removeContent(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="inline-block h-4 w-4 stroke-current"
                            >
                              {' '}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>{' '}
                            </svg>
                          </button>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          )}
          {/* Action */}
          <div className="text-center text-gray-500 ">
            {contents.length == 0 && (
              <>
                <p className="text-lg">No content present.</p>
                <p className="text-sm">Please select or add content to view.</p>
              </>
            )}
            <button
              className="btn btn-wide mt-6"
              onClick={() =>
                document.getElementById('add_content_modal').showModal()
              }
            >
              Add Content
            </button>
          </div>

          {/* Sidebar content here */}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
