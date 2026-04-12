import { Home, Folder, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, label, href, active = false }) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden md:flex h-screen w-64 bg-zinc-900 text-gray-200 flex-col justify-between p-4 border-r border-gray-700">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <Link to="/" className="text-lg font-semibold hover:text-blue-400 transition">
            DriveX
          </Link>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <SidebarItem
            icon={<Home size={18} />}
            label="Home"
            href="/"
          />
          <SidebarItem
            icon={<Folder size={18} />}
            label="Upload"
            href="/upload"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            href="/settings"
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
        <p className="mb-3">Storage Usage</p>
        <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
          <div className="bg-blue-500 h-2 rounded w-2/3"></div>
        </div>
        <p className="text-xs mt-2">66.7% of 100GB used</p>
      </div>
    </aside>
  );
};

export default Sidebar;
