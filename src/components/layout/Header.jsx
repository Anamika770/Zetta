import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  return (
    <header className="w-full h-16 bg-zinc-900 text-white border-b border-gray-700 flex items-center justify-between px-6 shadow-lg sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
          DriveX
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white font-medium transition">
            Home
          </Link>

          <Link to="/upload">
            <Button variant="primary">Upload</Button>
          </Link>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        <div
          className="relative flex items-center gap-2 cursor-pointer"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold hover:bg-blue-600 transition">
            👤
          </div>
          <span className="text-sm text-gray-300 hidden sm:inline">
            {user?.username}
          </span>

          {showDropdown && (
            <div className="absolute right-0 top-10 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg py-2 w-48 z-10">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-zinc-700">
                {user?.username}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
