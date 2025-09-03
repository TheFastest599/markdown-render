import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
  return (
    <div className="App bg-base-100 ">
      <input
        type="file"
        className="file-input"
        accept=".md,.txt"
        onChange={handleFileChange}
      />
      <MarkdownRenderer content={mdContent} />
    </div>
  );
}

export default App;
