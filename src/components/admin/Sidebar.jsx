import { FaChartBar, FaUser, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        🛒 UniBazzar
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem icon={<FaChartBar />} label="Dashboard" />
          <SidebarItem icon={<FaBoxOpen />} label="Listings" />
          <SidebarItem icon={<FaUser />} label="Users" />
          <SidebarItem icon={<FaMoneyCheckAlt />} label="Transactions" />
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        &copy; 2025 UniBazzar
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </li>
);

export default Sidebar;
