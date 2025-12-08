import React, { useState } from "react";
import { Pie, Cell, Legend, PieChart, ResponsiveContainer } from "recharts";

const SalesChart = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Mumbai");
  const [timeframe, setTimeframe] = useState("Today");

  const salesData = [
    { name: "Product 1", value: 60 },
    { name: "Product 2", value: 40 },
  ];

  const COLORS = ["#2563EB", "#FACC15"];

  // Custom label renderer for inside the pie
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full h-full flex flex-col">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Chart</h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs font-medium text-gray-700 transition-all hover:border-gray-400"
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs font-medium text-gray-700 transition-all hover:border-gray-400"
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs font-medium text-gray-700 transition-all hover:border-gray-400"
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* Pie Chart */}
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <PieChart>
            <defs>
              <filter id="shadow" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15"/>
              </filter>
            </defs>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={95}
              innerRadius={0}
              dataKey="value"
              paddingAngle={3}
              style={{ filter: "url(#shadow)" }}
            >
              {salesData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index]}
                  strokeWidth={2}
                  stroke="white"
                />
              ))}
            </Pie>

            {/* Custom Legend */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value, entry) => (
                <span className="text-xs text-gray-700 font-medium ml-1">
                  {value}
                </span>
              )}
              wrapperStyle={{ 
                paddingTop: "24px",
                display: "flex",
                justifyContent: "center",
                gap: "20px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
