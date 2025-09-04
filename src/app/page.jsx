'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosAdd } from 'react-icons/io';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import useGlobalStore from '@/stores/globalStore';

export default function Home() {
  const {
    contents,
    selectedId,
    setSelectedId,
    addContent,
    removeContent,
    handleFileChange,
  } = useGlobalStore();

  const selectedContent = contents.find(c => c.id === selectedId);

  return (
    <div className="App bg-base-100 text-sm sm:text-base lg:text-lg">
      <main className="max-w-6xl px-6 mx-auto">
        {selectedContent && (
          <MarkdownRenderer content={selectedContent.content} />
        )}
        {!selectedContent && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No content selected.</p>
            <p className="text-sm">Please select or add content to view.</p>
            <button
              className="btn btn-wide mt-6"
              onClick={() =>
                document.getElementById('add_content_modal').showModal()
              }
            >
              Add Content
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
