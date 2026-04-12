import { Link } from "react-router-dom";
import Button from "../ui/Button";

const Header = () => {
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
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer text-white font-bold hover:bg-blue-600 transition">
          👤
        </div>
      </div>
    </header>
  );
};

export default Header;
