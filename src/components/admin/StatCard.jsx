import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, icon, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const TrendIcon = trend === 'up' ? FaArrowUp : trend === 'down' ? FaArrowDown : null;

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h2 className="text-xl font-semibold text-white">{value}</h2>
        {TrendIcon && (
          <div className={`flex items-center gap-1 mt-1 text-sm ${trendColor}`}>
            <TrendIcon />
            <span>{trend === 'up' ? 'Increasing' : 'Decreasing'}</span>
          </div>
        )}
      </div>
      <div className="text-3xl text-white opacity-30">{icon}</div>
    </div>
  );
};

export default StatCard;
