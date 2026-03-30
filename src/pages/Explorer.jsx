import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import List from '../components/List';
import File from './File';
import Upload from './Upload';

const Explorer  = () => {
    const [isFile, setIsFile] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const folderName = location.pathname.split('/').pop() || 'Root';
    
    // Check if pathname looks like a file (has file extension)
    const looksLikeFile = (path) => {
        const lastSegment = path.split('/').pop();
        return /\.[a-zA-Z0-9]+$/.test(lastSegment);
    };
    
    useEffect(() => {
        const checkAndFetch = async () => {
            setLoading(true);
            try {
                // If it looks like a file, skip folder check
                if (looksLikeFile(location.pathname)) {
                    setIsFile(true);
                    setLoading(false);
                    return;
                }
                
                // Otherwise, try to fetch as a folder
                const response = await fetch(`http://localhost/folder${location.pathname}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setFiles(data);
                    setIsFile(false);
                } else {
                    // If folder endpoint fails, it's a file
                    setIsFile(true);
                }
            } catch (error) {
                console.error("Error fetching:", error);
                setIsFile(true);
            } finally {
                setLoading(false);
            }
        };
        
        checkAndFetch();
    }, [location.pathname]);

    async function handleCreateFolder() {
        const folderNameInput = prompt("Enter folder name:");
        if (!folderNameInput || folderNameInput.trim() === "") return;

        try {
            const response = await fetch(`http://localhost/folder${location.pathname}/${folderNameInput}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderName: folderNameInput })
            });

            if (response.ok) {
                alert("Folder created successfully!");
                // Refresh the file list
                const filesResponse = await fetch(`http://localhost/folder${location.pathname}`);
                const data = await filesResponse.json();
                setFiles(data);
            } else {
                alert("Failed to create folder");
            }
        } catch (error) {
            console.error("Error creating folder:", error);
            alert("Error creating folder");
        }
    }

    return (
        <>
            {loading ? (
                <div className="p-8 text-center text-amber-50">Loading...</div>
            ) : isFile ? (
                <File />
            ) : (
                <div className="p-8 m-auto text-amber-50">
                    <div className="flex flex-col justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-center flex-1">{folderName}</h1>
                        <Upload />
                        <button
                            onClick={handleCreateFolder}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                        >
                            + Create Folder
                        </button>
                    </div>
                    {files.length > 0 ? (
                        <ul>
                            {files.map((file) => (
                                <List key={file.name} item={file} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400">This folder is empty</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Explorer 