'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useGlobalStore from '@/stores/globalStore';
import { trackEvent } from '@/hooks/useAnalytics';

function Drawer() {
  const {
    contents,
    folders,
    setSelectedId,
    selectedId,
    removeContent,
    createFolder,
    moveContentToFolder,
    moveContentOutOfFolder,
  } = useGlobalStore();
  const [newFolderName, setNewFolderName] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null); // 'none' for no folder, or folder name
  const [showFolderInput, setShowFolderInput] = useState(false); // For inline folder creation

  const router = useRouter();
  const pathname = usePathname();

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
    }
    setShowFolderInput(false);
  };

  const handleFolderInputKeyDown = e => {
    if (e.key === 'Enter') {
      handleCreateFolder();
    } else if (e.key === 'Escape') {
      setShowFolderInput(false);
      setNewFolderName('');
    }
  };

  // Drag handlers
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, target) => {
    e.preventDefault();
    setDropTarget(target);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (draggedId && target !== null) {
      if (target === 'none') {
        moveContentOutOfFolder(draggedId);
      } else {
        moveContentToFolder(draggedId, target);
      }
    }
    setDraggedId(null);
    setDropTarget(null);
  };

  // Group contents by folder
  const contentsByFolder = {};
  const rootContents = [];
  Object.entries(contents).forEach(([id, item]) => {
    if (item.folder) {
      if (!contentsByFolder[item.folder]) contentsByFolder[item.folder] = [];
      contentsByFolder[item.folder].push([id, item]);
    } else {
      rootContents.push([id, item]);
    }
  });

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
                <h2
                  className={`menu-title flex ${
                    dropTarget === 'none'
                      ? 'bg-primary text-primary-content'
                      : ''
                  }`}
                  onDragOver={e => handleDragOver(e, 'none')}
                  onDragLeave={handleDragLeave}
                  onDrop={e => handleDrop(e, 'none')}
                >
                  <span className="flex-1">All Contents</span>
                  <button
                    className="btn btn-xs btn-square"
                    onClick={() => setShowFolderInput(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-folder-plus-icon lucide-folder-plus"
                    >
                      <path d="M12 10v6" />
                      <path d="M9 13h6" />
                      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                    </svg>
                  </button>
                </h2>
                <ul className="max-h-96 overflow-y-auto">
                  {/* Inline Folder Creation Input */}
                  {showFolderInput && (
                    <li>
                      <input
                        type="text"
                        placeholder="New folder name"
                        className="input input-bordered input-sm w-full"
                        value={newFolderName}
                        onChange={e => setNewFolderName(e.target.value)}
                        onKeyDown={handleFolderInputKeyDown}
                        onBlur={handleCreateFolder}
                        autoFocus
                      />
                    </li>
                  )}

                  {/* Root Contents */}
                  {rootContents.map(([id, item]) => (
                    <li
                      key={id}
                      draggable
                      onDragStart={e => handleDragStart(e, id)}
                    >
                      <div
                        className={`flex justify-between ${
                          id === pathname?.split('/')[1] ? 'menu-active' : ''
                        }`}
                      >
                        <Link
                          href={`/${id}`}
                          className="truncate w-full max-w-50 flex-1"
                          onClick={() => setSelectedId(id)}
                        >
                          {item.name}
                        </Link>
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
                      </div>
                    </li>
                  ))}

                  {/* Folders with Nested Menu */}
                  {folders.map(folderName => (
                    <li key={folderName}>
                      <details open>
                        <summary
                          className={`cursor-pointer ${
                            dropTarget === folderName
                              ? 'bg-primary text-primary-content'
                              : ''
                          }`}
                          onDragOver={e => handleDragOver(e, folderName)}
                          onDragLeave={handleDragLeave}
                          onDrop={e => handleDrop(e, folderName)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-folder-icon lucide-folder"
                          >
                            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                          </svg>{' '}
                          {folderName}
                        </summary>
                        <ul>
                          {(contentsByFolder[folderName] || []).map(
                            ([id, item]) => (
                              <li
                                key={id}
                                draggable
                                onDragStart={e => handleDragStart(e, id)}
                              >
                                <div
                                  className={`flex justify-between ${
                                    id === pathname?.split('/')[1]
                                      ? 'menu-active'
                                      : ''
                                  }`}
                                >
                                  <Link
                                    href={`/${id}`}
                                    className="truncate w-full max-w-50 flex-1"
                                    onClick={() => setSelectedId(id)}
                                  >
                                    {item.name}
                                  </Link>
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
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </details>
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

          {/* Actions */}
          <div className="flex flex-col items-center mt-6">
            <button
              className="btn btn-wide mb-2"
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
