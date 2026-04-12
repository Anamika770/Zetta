import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { folderAPI } from "../../services/api";

const FolderHeader = ({ name, onRefresh, parentDirId }) => {
  const location = useLocation();
  const handleCreateFolder = async (parentDirId) => {
    const folderName = prompt("Enter folder name:");
    if (!folderName || folderName.trim() === "") return;

    try {
      await folderAPI.createFolder(parentDirId, folderName);
      alert("Folder created successfully!");
      onRefresh?.();
    } catch (error) {
      alert("Failed to create folder");
      console.error("Create folder error:", error);
    }
  };

  return (
    <div className="mb-8 pb-6 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-50">{name}</h1>
        <div className="flex gap-3">
          <Button variant="primary" onClick={onRefresh}>
            🔄 Refresh
          </Button>
          <Button variant="success" onClick={() => handleCreateFolder(parentDirId)}>
            + New Folder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FolderHeader;
