import { Link, useLocation } from "react-router-dom";

const List = ({ item }) => {
  const location = useLocation();

  function locationFinder() {
    console.log(location.pathname);
  }

  async function handleDelete() {
    // Add delete logic here
    console.log("Delete:", item.name);
    const permission = confirm(
      "Content of this file will not be accessible. Do you still want to delete this file?",
    );
    if (permission) {
      try {
        const response = await fetch(
          `http://localhost/delete${location.pathname}/${item.name}`,
          {
            method: "DELETE",
          },
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  }

  function handleRename() {
    // Add rename logic here
    console.log("Rename:", item.name);
  }

  return (
    <li
      key={item.name}
      className=" text-gray-300 flex justify-between items-center w-full h-12 hover:bg-zinc-600 px-4 border-b border-gray-400 rounded"
    >
      {item.name}
      <div className="flex w-50 justify-around gap-2">
        <Link
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium cursor-pointer"
          to={`${item.name}`}
          state={{ mimeType: item.mimeType }}
        >
          preview
        </Link>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          onClick={locationFinder}
        >
          <a
            className="cursor-pointer"
            href={`http://localhost${item.isDirectory ? "/folder" : "/file"}${location.pathname}/${item.name}?action=download`}
          >
            download
          </a>
        </button>
        <button
          className=" cursor-pointer px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium"
          onClick={handleRename}
        >
          rename
        </button>
        <button
          className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default List;
