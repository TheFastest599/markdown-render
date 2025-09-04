import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      contents: [],
      selectedId: 1,
      setTheme: theme => {
        set({ theme });
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
          document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        }
      },
      addContent: (data, name = 'Untitled') => {
        const newId = Date.now();
        set(state => ({
          contents: [
            ...state.contents,
            {
              id: newId,
              name: name,
              content: data,
            },
          ],
          selectedId: newId,
        }));
      },
      removeContent: id => {
        set(state => {
          const newContents = state.contents.filter(c => c.id !== id);
          let newSelectedId = state.selectedId;
          if (state.selectedId === id && newContents.length > 0) {
            newSelectedId = newContents[0].id;
          }
          return { contents: newContents, selectedId: newSelectedId };
        });
      },
      setSelectedId: id => set({ selectedId: id }),
      handleFileChange: files => {
        const newContents = [];
        files.forEach(file => {
          const ext = file.name.split('.').pop().toLowerCase();
          if (ext !== 'md' && ext !== 'txt') {
            alert('Please select markdown (.md) or text (.txt) files.');
            return;
          }
          const reader = new FileReader();
          reader.onload = event => {
            newContents.push({
              id: Date.now() + Math.random(),
              name: file.name,
              content: event.target.result,
            });
            if (newContents.length === files.length) {
              set(state => ({
                contents: [...state.contents, ...newContents],
                selectedId: newContents[0].id,
              }));
            }
          };
          reader.readAsText(file);
        });
      },
    }),
    {
      name: 'markdown-renderer', // key for localStorage
    }
  )
);

export default useGlobalStore;
