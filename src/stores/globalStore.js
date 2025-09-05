import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      contents: [],
      selectedId: 1,
      loading: false,
      isHydrated: false,
      toggleLoading: value => set({ loading: value }),
      setHydrated: () => set({ isHydrated: true }),
      setTheme: theme => {
        set({ theme });
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
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
      handleFileChange: async files => {
        try {
          const { toggleLoading } = get();
          toggleLoading(true);

          const readFile = file => {
            return new Promise((resolve, reject) => {
              const ext = file.name.split('.').pop().toLowerCase();
              if (ext !== 'md' && ext !== 'txt') {
                reject(
                  new Error(
                    'Please select markdown (.md) or text (.txt) files.'
                  )
                );
                return;
              }

              const reader = new FileReader();
              reader.onload = event => {
                resolve({
                  id: Date.now() + Math.random(),
                  name: file.name,
                  content: event.target.result,
                });
              };
              reader.onerror = () =>
                reject(new Error(`Failed to read file: ${file.name}`));
              reader.readAsText(file);
            });
          };

          const newContents = await Promise.all(files.map(readFile));

          set(state => ({
            contents: [...state.contents, ...newContents],
            selectedId: newContents[0]?.id || state.selectedId,
          }));

          toggleLoading(false);
        } catch (error) {
          console.error('Error handling file change:', error);
          alert(error.message || 'Error reading files.');
          const { toggleLoading } = get();
          toggleLoading(false);
        }
      },
      loadExampleContent: async () => {
        try {
          const { toggleLoading } = useGlobalStore.getState();
          toggleLoading(true);
          const response = await fetch('/example.md');
          if (response.ok) {
            const content = await response.text();
            const newId = Date.now();
            set(state => ({
              contents: [
                ...state.contents,
                {
                  id: newId,
                  name: 'example.md',
                  content: content,
                },
              ],
              selectedId: newId,
            }));
            toggleLoading(false);
          } else {
            alert('Failed to load example content.');
            toggleLoading(false);
          }
        } catch (error) {
          console.error('Error loading example content:', error);
          alert('Error loading example content.');
          toggleLoading(false);
        }
      },
    }),
    {
      name: 'markdown-renderer', // key for localStorage
      partialize: state => ({
        theme: state.theme,
        contents: state.contents,
        selectedId: state.selectedId,
        // loading and isHydrated are excluded from persistence
      }),
      onRehydrateStorage: () => state => {
        // This callback is called when rehydration is complete
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);

// Hook to check if store is hydrated
export const useStoreHydration = () => {
  return useGlobalStore(state => state.isHydrated);
};

export default useGlobalStore;
