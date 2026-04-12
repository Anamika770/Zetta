import { Link } from "react-router-dom";
import { useFileActions } from "../../hooks/useFileActions";
import Button from "../ui/Button";
import { fileAPI } from "../../services/api";

const FileListItem = ({ isFolder, folderId, file, onDelete }) => {
  const { handleDelete, handleRename } = useFileActions(
    file.id,
    file.name,
    onDelete,
    isFolder,
    folderId
  );

  const downloadUrl = fileAPI.getDownloadUrl(
    file.id,
    file.isDirectory,
  );

  return (
    <li className="text-gray-300 flex justify-between items-center w-full h-14 hover:bg-zinc-600 px-4 border-b border-gray-700 rounded transition">
      <span className="font-medium truncate flex-1">{file.name}</span>
      <div className="flex gap-2 shrink-0">
        <Link to={`/file/${file.id}`} state={{ mimeType: file.mimeType }}>
          <Button variant="success">Preview</Button>
        </Link>
        <a href={downloadUrl}>
          <Button variant="primary">Download</Button>
        </a>
        <Button variant="warning" onClick={handleRename}>
          Rename
        </Button>
        <Button variant="danger" onClick={() => handleDelete(file.id, folderId)}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default FileListItem;
