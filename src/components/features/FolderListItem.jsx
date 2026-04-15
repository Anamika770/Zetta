import { Link } from "react-router-dom";
import { useFileActions } from "../../hooks/useFileActions";
import Button from "../ui/Button";
import { fileAPI } from "../../services/api";

const FolderListItem = ({ isFolder, folder, folderId, onDelete }) => {
  const { handleDelete, handleRename } = useFileActions(
    folder?.id,
    folder?.name,
    onDelete,
    isFolder
  );

  const downloadUrl = fileAPI.getDownloadUrl(
    folder?.id,
    folder?.name,
    folder?.isDirectory,
  );

  return (
    <li className="text-gray-300 flex justify-between items-center w-full h-14 hover:bg-zinc-600 px-4 border-b border-gray-700 rounded transition">
      <span className="font-medium truncate flex-1">{folder?.name}</span>
      <div className="flex gap-2 shrink-0">
        <Link to={`/folder/${folder?.id}`} state={{ mimeType: folder?.mimeType }}>
          <Button variant="success">Preview</Button>
        </Link>
        <Button variant="warning" onClick={handleRename}>
          Rename
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default FolderListItem;
