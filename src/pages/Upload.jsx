import { useState } from "react";
import { useLocation } from "react-router-dom";
function Upload() {
  const [file, setFile] = useState(null);
  const location = useLocation();

  function handleFileSubmit(e) { 
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost/file/upload/${location.pathname}/${file.name}`);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed");
      }
    };
    xhr.setRequestHeader("filename", file.name);
    xhr.send(file);
  }

  function handleFileChange(e){
    setFile(e.target.files[0]);
  }

  return (
    <div className="flex justify-center mt-20 m-auto">
      <div className="bg-zinc-900 text-amber-50 p-8 rounded-lg shadow-md w-105">
        <h1 className="text-2xl font-semibold mb-6 text-amber-200">
          Upload File
        </h1>

        <form className="flex flex-col gap-5" encType="multipart-form-data" onSubmit={(e) => handleFileSubmit(e)}>
          <input
            type="file"
            onChange={(e)=>handleFileChange(e)}
            className="border p-2 rounded-md"
          />

          {/* Selected File */}
          {file && (
            <div className="text-sm text-gray-600">
              Selected: <span className="font-medium">{file.name}</span>
            </div>
          )}

          {/* Upload Button */}
          <input
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            value="Upload"
          />
        </form>
      </div>
    </div>
  );
}

export default Upload;
