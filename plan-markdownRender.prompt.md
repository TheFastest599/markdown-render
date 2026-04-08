## Plan: Folder-Scoped Add Content Reuse

Reuse the existing Add Content modal for both global and folder-specific creation by adding a folder target context, passing it into existing add flows, and updating delete-folder behavior to cascade-delete folder contents. This keeps current drag-and-drop behavior intact while adding a faster in-folder add path.

**Steps**

1. Phase 1 - Store behavior updates (blocks later UI wiring)
2. Update [src/stores/globalStore.js](src/stores/globalStore.js) to support optional folder targeting in add APIs:
3. Extend addContent(data, name) to addContent(data, name, folderId = null) and write folderId into new content records.
4. Extend handleFileChange(files) to handleFileChange(files, folderId = null) and apply folderId to each created file record.
5. Change deleteFolder(id) from move-to-root behavior to cascade deletion: remove folder from folders and remove all contents whose content.folderId matches id.
6. Keep moveContentToFolder and moveContentOutOfFolder unchanged so existing drag-and-drop still works as-is.
7. Phase 2 - Reuse Add Content component for folder-specific adds (depends on Phase 1)
8. Update [src/components/AddContent.jsx](src/components/AddContent.jsx) to accept an optional prop targetFolderId (default null).
9. Reuse existing upload/paste handlers but pass targetFolderId into handleFileChange and addContent so both upload and pasted-content paths support folder insertion.
10. Keep modal id add_content_modal unchanged to preserve existing open/close calls across the app.
11. Phase 3 - Drawer UI wiring (depends on Phase 2)
12. Update [src/components/Drawer.jsx](src/components/Drawer.jsx) with local state for addContentTargetFolderId (null means root/global add).
13. Add a small plus button immediately to the left of the existing folder options (ellipsis) button in each folder summary row.
14. On plus click: stop propagation, set addContentTargetFolderId to folder.id, then open existing add_content_modal.
15. On global Add Content button click: set addContentTargetFolderId to null before opening modal.
16. Render AddContent in Drawer with targetFolderId={addContentTargetFolderId} so the same component is reused for both contexts.
17. Update folder delete warning text in Drawer to clearly state that deleting a folder permanently deletes all contents in that folder.
18. Phase 4 - UX consistency and safety checks (parallel with final verification)
19. Ensure folder options/delete modal close state remains correct after delete or cancel.
20. Ensure folder add does not unexpectedly expand/collapse folder details (prevent summary toggle side effects from button click).

**Relevant files**

- [d:/Web development/React Projects/markdown-render/src/stores/globalStore.js](d:/Web development/React Projects/markdown-render/src/stores/globalStore.js) - update addContent, handleFileChange, and deleteFolder semantics.
- [d:/Web development/React Projects/markdown-render/src/components/AddContent.jsx](d:/Web development/React Projects/markdown-render/src/components/AddContent.jsx) - add optional folder target prop and route existing handlers through it.
- [d:/Web development/React Projects/markdown-render/src/components/Drawer.jsx](d:/Web development/React Projects/markdown-render/src/components/Drawer.jsx) - add folder plus button, target-folder state wiring, and delete-warning copy update.

**Verification**

1. Manual: create folder A, click folder plus, upload one .md and paste one text entry, confirm both appear directly under folder A without drag-and-drop.
2. Manual: click global Add Content button, add content, confirm new content appears at root (folderId null).
3. Manual: keep existing flow: add at root then drag into folder; confirm drag-and-drop still works.
4. Manual: delete folder containing items; confirm folder is removed and all its contents are removed (not moved to root).
5. Manual: verify delete confirmation text matches new destructive behavior.
6. Run project checks (lint/build or existing test command from package scripts) to ensure no regressions from signature changes.

**Decisions**

- Confirmed: folder delete is destructive for contained items (cascade delete), not move-to-root.
- Confirmed: folder plus button supports both upload and paste, reusing the existing Add Content component.
- Included scope: Add Content reuse, folder-level plus trigger, store support for folder-targeted adds, warning copy update.
- Excluded scope: replacing dialog id strategy, redesigning modals, or changing drag-and-drop UX beyond current behavior.

**Further Considerations**

1. Backward compatibility: keep new folderId params optional so existing callers do not break.
2. Future enhancement candidate: show target folder name in Add Content modal header when opened from folder plus.

when add content modal is opened from a folder's plus button, update the modal header to indicate the target folder (e.g. "Add Content to [Folder Name]") for clearer user context. This can be implemented in a future enhancement phase after the core folder-scoped add functionality is in place.
