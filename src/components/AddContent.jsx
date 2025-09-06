'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/stores/globalStore';

function AddContent() {
  const { addContent, handleFileChange } = useGlobalStore();

  const router = useRouter();

  const handleFileChangeWrapper = async e => {
    const files = Array.from(e.target.files);
    const newId = await handleFileChange(files);
    e.target.value = null; // Reset file input
    if (newId) {
      router.push(`/${newId}`);
    }
    document.getElementById('add_content_modal').close();
  };

  const [textContent, setTextContent] = useState({
    name: '',
    content: '',
  });

  const handlePasteAdd = async () => {
    if (textContent.content.trim() && textContent.name.trim()) {
      const newId = await addContent(textContent.content, textContent.name);
      setTextContent({ name: '', content: '' });
      document.getElementById('add_content_modal').close();
      if (newId) {
        router.push(`/${newId}`);
      }
    } else {
      alert('Please provide both name and content.');
      document.getElementById('add_content_modal').close();
    }
  };

  return (
    <dialog id="add_content_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-6">Add New Content</h3>

        {/* File Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Files</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".md,.txt"
            multiple
            onChange={handleFileChangeWrapper}
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload markdown (.md) or text (.txt) files
          </p>
        </div>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Paste Content Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Paste Content
          </label>
          <div className="space-y-3">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter a name for your content..."
              value={textContent.name}
              onChange={e =>
                setTextContent({ ...textContent, name: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full min-h-32"
              placeholder="Paste your markdown or text content here..."
              value={textContent.content}
              onChange={e =>
                setTextContent({ ...textContent, content: e.target.value })
              }
              rows={6}
            />
            <button
              className="btn btn-secondary w-full"
              onClick={handlePasteAdd}
              disabled={!textContent.name.trim() || !textContent.content.trim()}
            >
              Add Pasted Content
            </button>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AddContent;
