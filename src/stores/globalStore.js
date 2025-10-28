import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      contents: {}, // Each content: { name, content, folderId: null | string }
      folders: [], // Array of { id: string, name: string }
      selectedId: null,
      printRef: null,
      loading: false,
      isHydrated: false,
      message: '',
      type: 'info',
      visible: false,

      // Toast Functions
      showToast: (message, type = 'info') =>
        set({ message, type, visible: true }),
      hideToast: () => set({ visible: false }),

      // Loading State
      toggleLoading: value => set({ loading: value }),

      // Hydration State
      setHydrated: () => set({ isHydrated: true }),

      // Theme Management
      setTheme: theme => {
        set({ theme });
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
        }
      },

      // Add Content
      addContent: (data, name = 'Untitled') => {
        const newId = name.replace(/ /g, '_');

        const { contents } = get();
        if (contents[newId]) {
          set({ selectedId: newId });
          return newId;
        }

        set(state => ({
          contents: {
            ...state.contents,
            [newId]: {
              name: name,
              content: data,
              folderId: null, // Default to no folder
            },
          },
          selectedId: newId,
        }));
        return newId;
      },

      editContent: (id, newData) => {
        set(state => {
          if (!state.contents[id]) return {};
          return {
            contents: {
              ...state.contents,
              [id]: {
                ...state.contents[id],
                content: newData,
              },
            },
          };
        });
      },

      // Remove Content
      removeContent: id => {
        set(state => {
          const { [id]: _, ...newContents } = state.contents;
          let newSelectedId = state.selectedId;
          if (state.selectedId === id && Object.keys(newContents).length > 0) {
            newSelectedId = null;
          }
          return { contents: newContents, selectedId: newSelectedId };
        });
      },

      // Set Selected Content
      setSelectedId: id => set({ selectedId: id }),

      // Create Folder
      createFolder: name => {
        set(state => {
          const newId = `folder_${Date.now()}`; // Generate unique ID
          if (state.folders.some(f => f.name === name)) return {}; // Avoid duplicates
          return { folders: [...state.folders, { id: newId, name }] };
        });
      },

      // Rename Folder
      renameFolder: (id, newName) => {
        set(state => ({
          folders: state.folders.map(f =>
            f.id === id ? { ...f, name: newName } : f
          ),
        }));
      },

      // Delete Folder
      deleteFolder: id => {
        set(state => {
          const newFolders = state.folders.filter(f => f.id !== id);
          const newContents = Object.fromEntries(
            Object.entries(state.contents).map(([cid, c]) => [
              cid,
              c.folderId === id ? { ...c, folderId: null } : c,
            ])
          );
          return { folders: newFolders, contents: newContents };
        });
      },

      // Move Content to Folder
      moveContentToFolder: (id, folderId) => {
        set(state => {
          if (
            !state.contents[id] ||
            !state.folders.some(f => f.id === folderId)
          )
            return {};
          return {
            contents: {
              ...state.contents,
              [id]: {
                ...state.contents[id],
                folderId,
              },
            },
          };
        });
      },

      // Move Content Out of Folder
      moveContentOutOfFolder: id => {
        set(state => {
          if (!state.contents[id]) return {};
          return {
            contents: {
              ...state.contents,
              [id]: {
                ...state.contents[id],
                folderId: null,
              },
            },
          };
        });
      },

      // Handle File Upload
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
                  id: file.name.replace(/ /g, '_'),
                  name: file.name,
                  content: event.target.result,
                  folderId: null, // Default to no folder
                });
              };
              reader.onerror = () =>
                reject(new Error(`Failed to read file: ${file.name}`));
              reader.readAsText(file);
            });
          };

          const newContents = await Promise.all(files.map(readFile));

          const { contents } = get();
          const uniqueNewContents = newContents.filter(
            newContent => !contents[newContent.id]
          );

          if (uniqueNewContents.length === 0) {
            toggleLoading(false);
            return newContents[0]?.id || null;
          }

          const newContentsObject = uniqueNewContents.reduce(
            (acc, content) => ({
              ...acc,
              [content.id]: {
                name: content.name,
                content: content.content,
                folderId: content.folderId,
              },
            }),
            {}
          );

          set(state => ({
            contents: { ...state.contents, ...newContentsObject },
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

      // Load Example Content
      loadExampleContent: async () => {
        try {
          const { toggleLoading } = useGlobalStore.getState();
          toggleLoading(true);

          const newId = 'example.md';

          const { contents } = get();
          if (contents[newId]) {
            set({ selectedId: newId });
            toggleLoading(false);
            return newId;
          }

          const response = await fetch('/_example.md');
          if (response.ok) {
            const content = await response.text();
            set(state => ({
              contents: {
                ...state.contents,
                [newId]: {
                  name: 'example.md',
                  content: content,
                  folderId: null, // Default to no folder
                },
              },
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
      name: 'markdown-renderer-V0',
      partialize: state => ({
        theme: state.theme,
        contents: state.contents,
        folders: state.folders,
        selectedId: state.selectedId,
      }),
      onRehydrateStorage: () => state => {
        if (state) state.setHydrated();
      },
    }
  )
);

// Hook to check if store is hydrated
export const useStoreHydration = () => {
  return useGlobalStore(state => state.isHydrated);
};

export default useGlobalStore;
