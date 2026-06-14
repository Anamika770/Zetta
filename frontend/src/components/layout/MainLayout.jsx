import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-zinc-800 text-amber-50">
    <Header />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
