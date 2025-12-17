import React, { useState } from "react";
import { Pie, Cell, Legend, PieChart, ResponsiveContainer } from "recharts";

const SalesChart = () => {
  const [country, setCountry] = useState("India");
  const [states, setState] = useState();
  const [city, setCity] = useState("Mumbai");
  const [timeframe, setTimeframe] = useState("Today");

  const salesData = [
    { name: "Product 1", value: 60 },
    { name: "Product 2", value: 40 },
  ];

  const COLORS = ["#2563EB", "#FACC15"]; // Blue & Yellow (matching UI)

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-7 w-full h-full flex flex-col">
      {/* Title + Filters */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Sales Chart</h3>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976d2] bg-white text-sm"
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        <select
          value={city}
          onChange={(e) => setState(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc107] bg-white text-sm"
        >
          <option value="Mumbai">Maharastra</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc107] bg-white text-sm"
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              paddingAngle={2}
            >
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>

            {/* Legend styling */}
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700 font-medium">
                  {value}
                </span>
              )}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
