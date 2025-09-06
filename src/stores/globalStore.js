import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      contents: [],
      selectedId: 1,
      printRef: null,
      loading: false,
      isHydrated: false,
      message: '',
      type: 'info', // 'info', 'success', 'error', etc.
      visible: false,
      showToast: (message, type = 'info') =>
        set({ message, type, visible: true }),
      hideToast: () => set({ visible: false }),
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
        const newId = name; // Use filename as ID directly

        // Check if content with same ID already exists
        const { contents } = get();
        const existingContent = contents.find(c => c.id === newId);

        if (existingContent) {
          // Content already exists, don't add duplicate
          set({ selectedId: newId }); // Just select the existing one
          return newId;
        }

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
        return newId;
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
      setSelectedId: id => {
        set({ selectedId: id });
      },
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
                  id: file.name, // Use filename as ID directly
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

          // Filter out files that already exist
          const { contents } = get();
          const uniqueNewContents = newContents.filter(
            newContent =>
              !contents.find(existing => existing.id === newContent.id)
          );

          if (uniqueNewContents.length === 0) {
            // All files already exist, just select the first one
            toggleLoading(false);
            return newContents[0]?.id || null;
          }

          set(state => ({
            contents: [...state.contents, ...uniqueNewContents],
            selectedId: uniqueNewContents[0]?.id || state.selectedId,
          }));

          toggleLoading(false);
          return uniqueNewContents[0]?.id || newContents[0]?.id || null;
        } catch (error) {
          console.error('Error handling file change:', error);
          alert(error.message || 'Error reading files.');
          const { toggleLoading } = get();
          toggleLoading(false);
          return null;
        }
      },
      loadExampleContent: async () => {
        try {
          const { toggleLoading } = useGlobalStore.getState();
          toggleLoading(true);

          const newId = 'example.md'; // Use filename as ID directly

          // Check if example.md already exists
          const { contents } = get();
          const existingContent = contents.find(c => c.id === newId);

          if (existingContent) {
            // Example already exists, just select it
            set({ selectedId: newId });
            toggleLoading(false);
            return newId;
          }

          const response = await fetch('/_example.md');
          if (response.ok) {
            const content = await response.text();
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
            return newId;
          } else {
            alert('Failed to load example content.');
            toggleLoading(false);
            return null;
          }
        } catch (error) {
          console.error('Error loading example content:', error);
          alert('Error loading example content.');
          toggleLoading(false);
          return null;
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
