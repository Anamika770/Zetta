import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { fileAPI } from "../../services/api";
import { useParams } from "react-router-dom";

const UploadForm = ({ onUpload, folderid }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const params = useParams();
  console.log("PATH:", location.pathname);
  const folderId = params.id || folderid;
  console.log("FOLDER ID:", folderId);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      await fileAPI.upload(folderId, file);
      alert("File uploaded successfully!");
      onUpload?.();
      setFile(null);
    } catch (error) {
      alert("File upload failed");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <form
      onSubmit={handleFileSubmit}
      encType="multipart/form-data"
      className="mb-6 p-4 bg-zinc-800 rounded-lg border border-gray-700"
    >
      <div className="flex gap-4 items-center flex-wrap">
        <input
          type="file"
          onChange={handleFileChange}
          className="flex-1 min-w-50 border border-gray-600 p-2 rounded-md bg-zinc-700 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          disabled={uploading}
        />
        {file && <span className="text-sm text-gray-400">{file.name}</span>}
        <Button type="submit" variant="success" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
