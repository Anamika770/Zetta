import { Home, Plus, Folder, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="h-screen w-64 bg-zinc-900 text-gray-200 flex flex-col justify-between p-4">

        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-lg font-semibold">iCloud</span>
          </div>

          {/* Add New File */}
          <button className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg mb-6 transition">
            <span>Add New File</span>
            <Plus size={18} />
          </button>

          {/* Menu */}
          <nav className="space-y-2">
            <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
            <SidebarItem icon={<Folder size={18} />} label="Files" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="text-sm text-gray-400">
          <p>Storage</p>
          <div className="w-full bg-gray-700 h-2 rounded mt-2">
            <div className="bg-blue-500 h-2 rounded w-2/3"></div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
      ${active ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}