import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TotalStaffChart = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Mumbai");
  const [timeframe, setTimeframe] = useState("This Year");

  const staffData = [
    { month: "Jan", staff: 380 },
    { month: "Feb", staff: 520 },
    { month: "Mar", staff: 620 },
    { month: "April", staff: 270 },
    { month: "May", staff: 520 },
    { month: "Jun", staff: 530 },
    { month: "Jul", staff: 530 },
    { month: "Aug", staff: 630 },
    { month: "Sept", staff: 530 },
    { month: "Oct", staff: 580 },
    { month: "Nov", users: 530 },
    { month: "Dec", users: 540 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Total Staff</h3>
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
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
          data={staffData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
            dataKey="staff"
            fill="#14B8A6"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalStaffChart;
