import FileListItem from "./FileListItem";
import FolderListItem from "./FolderListItem";

const FileList = ({ files, folders, folderId, onDelete }) => {
  if (files?.length === 0 && folders?.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8 italic">
        No files or folders in this directory
      </p>
    );
  }

  return (
    files?.length > 0 || folders?.length > 0) && (
    <ul className="space-y-0 rounded border border-gray-700">
      {folders?.map((folder) => (
        <FolderListItem
          key={folder.id || folder.name}
          isFolder={true}
          folder={folder}
          onDelete={onDelete}
        />
      ))}
      {files?.map((file) => (
        <FileListItem
          key={file.id || file.name}
          isFolder={false}
          folderId={folderId}
          file={file}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default FileList;
