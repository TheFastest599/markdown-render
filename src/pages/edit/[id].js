import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useGlobalStore from '@/stores/globalStore';

function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { contents, setSelectedId, editContent, showToast } = useGlobalStore();

  // Memoize the selected content to avoid unnecessary recalculations
  const selectedContent = useMemo(() => contents[id], [contents, id]);

  const [editText, setEditText] = useState('');

  useEffect(() => {
    // if (id && !selectedContent) {
    //   // If id is invalid, reset selectedId to null
    //   showToast('Content not found. Redirecting to home.', 'error');
    //   router.push('/');
    //   setSelectedId(null);
    // }

    if (id && selectedContent) {
      setSelectedId(id);
      setEditText(selectedContent.content);
    }
  }, [id, selectedContent]);

  useEffect(() => {
    if (selectedContent) {
      document.title = `${selectedContent.name} - [Edit] Markdown Render`;
    } else {
      document.title = 'Markdown Render';
    }
  }, [selectedContent]);

  const handleSubmit = e => {
    e.preventDefault();
    if (id && editText) {
      editContent(id, editText);
      showToast('Content updated successfully!', 'success');
      router.push(`/${id}`);
    }
  };

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
    <main className="App text-sm sm:text-base lg:text-lg max-w-6xl px-6 mx-auto">
      <div className="flex justify-between">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Edit</a>
            </li>
            <li>
              <Link href={`/${id}`}>{selectedContent.name}</Link>
            </li>
          </ul>
        </div>
      </div>

      <form className="fieldset" onSubmit={handleSubmit}>
        <legend className="fieldset-legend">Edit Content</legend>
        <textarea
          className="textarea h-[65vh] w-full "
          placeholder="Content goes here..."
          value={editText}
          onChange={e => setEditText(e.target.value)}
        ></textarea>
        <button className="btn btn-primary w-30 mt-4" type="submit">
          Save
        </button>
      </form>
    </main>
  );
}

export default EditPage;
