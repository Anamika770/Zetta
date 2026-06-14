import { useState, useEffect } from "react";
import { folderAPI } from "../services/api";

export const useFolderData = (pathname) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFolder = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await folderAPI.getFolder(pathname);
      console.log(data);
      setFiles(data.files || []);
      setFolders(data.folders || []);
      setFolderId(data.id || "");
      setFolderName(data.name || "");
    } catch (err) {
      setError(err.message || "Failed to load folder");
      setFiles([]);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname) {
      fetchFolder();
    }
  }, [pathname]);

  return {
    files,
    folders,
    folderId,
    folderName,
    loading,
    error,
    refetch: fetchFolder,
    setFiles
  };
};
