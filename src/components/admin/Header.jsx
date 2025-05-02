import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-300 hover:text-white transition">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-ping" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl text-gray-300" />
          <span className="text-sm hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
