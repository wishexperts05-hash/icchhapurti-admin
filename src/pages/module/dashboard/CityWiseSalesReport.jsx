import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CityWiseSalesReport = () => {
  const [country, setCountry] = useState("India");
  const [timeframe, setTimeframe] = useState("This Year");

  const cityData = [
    { name: "Mumbai", sales: 650 },
    { name: "Delhi", sales: 580 },
    { name: "Kolkata", sales: 450 },
    { name: "Chennai", sales: 630 },
    { name: "Noida", sales: 530 },
    { name: "Goa", sales: 530 },
    { name: "Pune", sales: 700 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-gray-900">
          City Wise Sales Report
        </h3>
        <div className="flex flex-wrap gap-3">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="This Year">This Year</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={cityData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 13 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <Bar
            dataKey="sales"
            fill="#FB923C"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CityWiseSalesReport;
