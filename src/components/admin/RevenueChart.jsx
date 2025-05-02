import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4600 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 5800 },
];

const RevenueChart = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
