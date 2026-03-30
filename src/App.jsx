import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar"

const App = () => {
  

  // const handleFileRequest = async(item, action) => {
  //     const url = `http://localhost/${item}?action=${action}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //   };

  return (
    <div className="min-h-screen bg-zinc-800">
      <Header />
      <div className="flex">
      <Sidebar/>
      <Outlet />
      </div>
    </div>
  );
};

export default App;
