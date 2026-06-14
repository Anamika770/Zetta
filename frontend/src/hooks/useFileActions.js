import { folderAPI, fileAPI } from "../services/api";
import { confirmAction, showAlert } from "../utils/helpers";

export const useFileActions = (currentPath, fileName, onActionComplete, isFolder, folderId) => {
  const handleDelete = async () => {
    if (!confirmAction("Content of this file will not be accessible. Do you still want to delete?")) return;

    try {
      if (isFolder) {
        await folderAPI.deleteItem(currentPath, folderId);
      } else {
        await fileAPI.deleteItem(currentPath, folderId);
      }
      showAlert("Item deleted successfully!");
    } catch (error) {
      showAlert("Failed to delete item");
      console.error("Delete error:", error);
    }
  };

  const handleRename = async () => {
    const newName = prompt("Enter new name:", fileName);
    if (!newName || newName === fileName) return;

    try {
      if (isFolder) {
        await folderAPI.renameItem(currentPath, newName);
      } else {
        await fileAPI.renameItem(currentPath, newName);
      }
      showAlert("Item renamed successfully!");
    } catch (error) {
      showAlert("Failed to rename item");
      console.error("Rename error:", error);
    }
  };

  return { handleDelete, handleRename };
};
