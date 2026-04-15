const API_BASE = "http://localhost:80";

export const folderAPI = {
  getFolder: async (path) => {
    console.log(path);
    const response = await fetch(`${API_BASE}/folder/${path}`,{
      credentials: "include",
    });
    return response.json();
  },

  createFolder: async (path, name) => {
    console.log(`Creating folder in ${path} with name ${name}`);
    const response = await fetch(`${API_BASE}/folder/${path}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderName: name }),
    });
    return response.json();
  },

  renameItem: async(path, newName)=>{
    const response = await fetch(`${API_BASE}/folder/${path}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName }),
    });
    return response.json();
  },

  deleteItem: async (path, name) => {
    const response = await fetch(`${API_BASE}/folder/${path}`, {
      credentials: "include",
      method: "DELETE",
    });
    return response.json();
  },
};

export const fileAPI = {
  upload: (path, file) => {
    // console.log(path);
    // console.log(file);
    console.log(`${API_BASE}/file/${path ? path : ""}`);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("POST", `${API_BASE}/file/${path ? path : ""}`);
      xhr.setRequestHeader("fileName", file.name);
      
      
      xhr.onload = () => {
        if (xhr.status === 201) {
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      };
      
      xhr.onerror = () => reject(new Error("Upload error"));
      xhr.send(file);
    });
  },

  getDownloadUrl: (path, isDirectory) => {
    return `${API_BASE}${isDirectory ? "/folder" : "/file"}/${path}?action=download`;
  },

  getFileViewUrl: (path) => {
    return `${API_BASE}${path}`;
  },

  renameItem: async(path, newName)=>{
    const response = await fetch(`${API_BASE}/file/${path}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName }),
    });
    return response.json();
  },

  deleteItem: async (path, parentDirId) => {
    const response = await fetch(`${API_BASE}/file/${path}`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({ parentDirId }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
};
