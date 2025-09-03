import React, { useState } from 'react';
import './App.css';
import { IoIosAdd } from 'react-icons/io';

import MarkdownRenderer from './components/MarkdownRenderer';

function App() {
  const [count, setCount] = useState(0);
  const [mdContent, setMdContent] = useState(`
# Example Markdown

This is **bold** and this is *italic*.

Inline math: $E = mc^2$

Block math:
$$
\\int_{a}^{b} f(x) \\, dx
$$
`);

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'md' && ext !== 'txt') {
      alert('Please select a markdown (.md) or text (.txt) file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      setMdContent(event.target.result);
    };
    reader.readAsText(file);
  };
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );
  const handleThemeChange = e => {
    const checked = e.target.checked;
    const newTheme = checked ? 'night' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  return (
    <div className="App bg-base-100 text-sm sm:text-md">
      {/* Navbar */}
      {/* <input
        type="file"
        className="file-input"
        accept=".md,.txt"
        onChange={handleFileChange}
      /> */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Markdown Renderer</a>
        </div>
        <div className="flex-none mx-2 join gap-2">
          <button className="btn btn-ghost text-4xl join-item">
            <IoIosAdd />
          </button>
          <label className="swap swap-rotate join-item">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller "
              value="night"
              checked={theme === 'night'}
              onChange={handleThemeChange}
            />

            {/* sun icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
      {/* ------------------------------------------ */}
      {/* <input
        type="file"
        className="file-input"
        accept=".md,.txt"
        onChange={handleFileChange}
      /> */}
      <MarkdownRenderer content={mdContent} />
    </div>
  );
}

export default App;
