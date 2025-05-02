import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  const data = [
    { name: "Books", value: 100 },
    { name: "Clothing", value: 300 },
    { name: "Electronics", value: 300 },
    { name: "Services", value: 200 },
  ];
  
  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];
  
  const SalesByCategoryChart = () => {
    return (
      <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default SalesByCategoryChart;
  