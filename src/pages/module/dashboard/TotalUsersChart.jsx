import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TotalUsersChart = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Mumbai");
  const [timeframe, setTimeframe] = useState("This Year");

  const userData = [
    { month: "Jan", users: 650 },
    { month: "Feb", users: 580 },
    { month: "Mar", users: 450 },
    { month: "April", users: 630 },
    { month: "May", users: 650 },
    { month: "Jun", users: 520 },
    { month: "Jul", users: 530 },
    { month: "Aug", users: 720 },
    { month: "Sept", users: 530 },
    { month: "Oct", users: 700 },
    { month: "Nov", users: 530 },
    { month: "Dec", users: 820 },
  ];

  // Custom tooltip for premium feel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Users: <span className="font-bold text-cyan-500">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        <div className="flex flex-wrap gap-2">
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
            <option value="This Year">This Year</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={userData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity={1} />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity={0.9} />
            </linearGradient>
            <filter id="usersShadow" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
            opacity={0.5}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tickMargin={8}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }} />
          <Bar
            dataKey="users"
            fill="url(#usersGradient)"
            radius={[10, 10, 0, 0]}
            maxBarSize={35}
            style={{ filter: "url(#usersShadow)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsersChart;