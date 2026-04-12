import { useState, useEffect } from "react";
import FileList from "../components/features/FileList";
import UploadForm from "../components/features/UploadForm";
import Button from "../components/ui/Button";
import { showAlert } from "../utils/helpers";
import FolderHeader from './../components/features/FolderHeader';
import Explorer from "./Explorer";

const Home = () => {
  // const [files, setFiles] = useState([]);
  // const [folders, setFolders] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentDirId, setCurrentDirId] = useState(null);

  // useEffect(() => {
  //   loadRootFolder();
  // }, []);

  // const loadRootFolder = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://localhost/folder");
  //     const data = await res.json();
  //     setFiles(data.files || []);
  //     setFolders(data.folders || []);
  //     setCurrentDirId(data.id);
  //   } catch (err) {
  //     console.error("Error loading root folder:", err);
  //     showAlert("Failed to load files");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleCreateFolder = async () => {
  //   const folderName = prompt('Enter folder name:');
  //   if (!folderName || folderName.trim() === "") return;

  //   try {
  //     const response = await fetch(`http://localhost/folder/${folderName}`, {
  //       method: "POST",
  //       headers: { "parentdirid": currentDirId },
  //     });

  //     if (response.ok) {
  //       showAlert("Folder created successfully!");
  //       loadRootFolder();
  //     } else {
  //       showAlert("Failed to create folder");
  //     }
  //   } catch (error) {
  //     console.error("Error creating folder:", error);
  //     showAlert("Failed to create folder");
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="p-8 text-center">
  //       <p className="text-lg">Loading...</p>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="p-8">
  //     <FolderHeader name="Root Files" onRefresh={loadRootFolder} parentDirId={currentDirId} />
  //     <UploadForm onUpload={loadRootFolder} />
  //     <FileList files={files} folders={folders} currentPath="" onDelete={loadRootFolder} />
  //   </div>
  // );
  return <Explorer />;
};

export default Home;
