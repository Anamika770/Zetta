export default function Header() {

  return (
    <header className="w-full h-16 bg-zinc-800 text-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-8">
        
        <div className="text-xl font-semibold text-gray-800">
          DriveX
        </div>

        <nav className="flex items-center gap-6">
          <button className=" hover:text-black font-medium">
            <a href="/">Home</a>
          </button>

          <div className="relative group">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
              <a href="/upload" className="text-white">
                Upload
              </a>
            </button>

            {/* <div className="absolute top-10 left-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Upload File
              </button>

              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Create Folder
              </button> */}
            {/* </div> */}
          </div>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          👤
        </div>
      </div>

    </header>
  );
}