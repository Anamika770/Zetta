import { useLocation } from "react-router-dom";
import { fileAPI } from "../../services/api";
import { extractFolderName } from "../../utils/helpers";

const FilePreview = () => {
  const location = useLocation();
  const fileName = extractFolderName(location.pathname);
  const fileUrl = fileAPI.getFileViewUrl(location.pathname);

  return (
    <div className="text-amber-50 m-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{fileName}</h1>
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <iframe
          src={fileUrl}
          title={fileName}
          className="w-full min-h-screen"
        />
      </div>
    </div>
  );
};

export default FilePreview;
