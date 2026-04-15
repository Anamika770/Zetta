import { useLocation, useParams } from "react-router-dom";
import { useFolderData } from "../hooks/useFolderData";
import FileList from "../components/features/FileList";
import UploadForm from "../components/features/UploadForm";
import FolderHeader from "../components/features/FolderHeader";

const Explorer = () => {
  const { id } = useParams();
  const { files, folders, folderId, folderName, loading, refetch } = useFolderData(id || " ");

  if (loading) {
    return (
      <div className="p-8 text-center text-amber-50">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 m-auto text-amber-50">
      <FolderHeader name={folderName} parentDirId={folderId} onRefresh={refetch} />
      <UploadForm folderId={folderId} onUpload={refetch} />
      <FileList files={files} folders={folders} folderId={folderId} onDelete={refetch} />
    </div>
  );
};

export default Explorer;
