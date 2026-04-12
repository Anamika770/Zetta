import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Upload from "./pages/Upload";
import Home from './pages/Home';
import File from './pages/File.jsx';
import Explorer from './pages/Explorer.jsx';

const router = createBrowserRouter(
    [
      {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/", 
          element: <Home />,
        },
        {
          path: "/folder/:id",
          element: <Explorer />,
        },
        {
          path: "/upload",
          element: <Upload />,
        },
        {
          path: "/file/:id",
          element: <File />,
        },
      ],
    }
    ]
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
