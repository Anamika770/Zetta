import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../components/List";
import Upload from './Upload';

const Home = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost/folder")
      .then((res) => res.json())
      .then((data) => {
        setItems(data );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  async function handleCreateFolder() {
    const folderNameInput = prompt("Enter folder name:");
    if (!folderNameInput || folderNameInput.trim() === "") return;

    try {
      const response = await fetch(`http://localhost/folder/${folderNameInput}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: folderNameInput })
      });

      if (response.ok) {
        alert("Folder created successfully!");
        // Refresh the file list
        const filesResponse = await fetch("http://localhost/folder");
        const data = await filesResponse.json();
        setItems(data);
      } else {
        alert("Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Error creating folder");
    }
  }

  return (
    <div className="text-amber-50 p-8 flex flex-col m-auto">
      <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="text-2xl text-center flex-1">My Files</h1>
         <Upload />
        <button
          onClick={handleCreateFolder}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
        >
          + Create Folder
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <List item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
