import { Building2, Utensils, Users, BarChart3, Download, UserCircle } from "lucide-react";
import { useState } from "react";
import { dashboard1Icon,dashboard2Icon,dashboard3Icon } from "../../../assets/Dashboardicon/dashboardicon";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("This Year");

  // Mock data
  const statsData = [
    {
      title: "Total User",
      value: "3,000",
      growth: "+5% This Month",
      bgColor: "from-green-100 to-green-50",
      icon: dashboard1Icon,
    },
    {
      title: "Total App Downloaded",
      value: "15,000",
      growth: "",
      bgColor: "from-blue-100 to-blue-50",
      icon: dashboard2Icon,
    },
    {
      title: "Total Staff",
      value: "5,000",
      growth: "",
      bgColor: "from-purple-100 to-purple-50",
      icon: dashboard3Icon,
    }
  ];

  const monthlyData = [
    { month: "Jan", value: 600 },
    { month: "Feb", value: 550 },
    { month: "Mar", value: 450 },
    { month: "Apr", value: 600 },
    { month: "May", value: 650 },
    { month: "Jun", value: 520 },
    { month: "Jul", value: 530 },
    { month: "Aug", value: 720 },
    { month: "Sept", value: 520 },
    { month: "Oct", value: 700 },
    { month: "Nov", value: 550 },
    { month: "Dec", value: 800 }
  ];

  const luckyDrawData = [
    { month: "Jan", entries: 650, winners: 120 },
    { month: "Feb", entries: 520, winners: 95 },
    { month: "Mar", entries: 480, winners: 88 },
    { month: "Apr", entries: 720, winners: 135 },
    { month: "May", entries: 610, winners: 112 },
    { month: "Jun", entries: 550, winners: 98 },
    { month: "Jul", entries: 690, winners: 128 },
    { month: "Aug", entries: 800, winners: 148 },
    { month: "Sept", entries: 620, winners: 115 },
    { month: "Oct", entries: 680, winners: 125 },
    { month: "Nov", entries: 590, winners: 108 },
    { month: "Dec", entries: 720, winners: 132 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));
  const maxDrawValue = Math.max(...luckyDrawData.flatMap(d => [d.entries, d.winners]));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white p-6 mb-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-700 font-medium mb-2">{stat.title}</p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  {stat.growth && (
                    <p className="text-green-600 text-sm font-medium">{stat.growth}</p>
                  )}
                </div>
                <div className="text-5xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Total Users Chart */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Total Users</h2>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>This Year</option>
                <option>Last Year</option>
                <option>2 Years Ago</option>
              </select>
            </div>

            <div className="flex items-end justify-between h-80 gap-3">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '280px' }}>
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer"
                      style={{ height: `${(data.value / maxValue) * 100}%` }}
                      title={`${data.value} users`}
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{data.month}</span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="flex justify-between text-sm text-gray-500 mt-2 px-2">
              <span>0</span>
              <span>{Math.round(maxValue / 4)}</span>
              <span>{Math.round(maxValue / 2)}</span>
              <span>{Math.round((maxValue * 3) / 4)}</span>
              <span>{maxValue}+</span>
            </div>
          </div>

          {/* Lucky Draw Stats Chart */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Lucky Draw Stats</h2>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>This Year</option>
                <option>Last Year</option>
                <option>2 Years Ago</option>
              </select>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Total Entries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-600">Total Winners</span>
              </div>
            </div>

            <div className="flex items-end justify-between h-80 gap-3">
              {luckyDrawData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                  <div className="relative w-full flex items-end justify-center gap-1" style={{ height: '280px' }}>
                    <div
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg hover:from-green-600 hover:to-green-500 transition-all cursor-pointer"
                      style={{ height: `${(data.entries / maxDrawValue) * 100}%` }}
                      title={`${data.entries} entries`}
                    />
                    <div
                      className="flex-1 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg hover:from-yellow-500 hover:to-yellow-400 transition-all cursor-pointer"
                      style={{ height: `${(data.winners / maxDrawValue) * 100}%` }}
                      title={`${data.winners} winners`}
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{data.month}</span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="flex justify-between text-sm text-gray-500 mt-2 px-2">
              <span>0</span>
              <span>{Math.round(maxDrawValue / 4)}</span>
              <span>{Math.round(maxDrawValue / 2)}</span>
              <span>{Math.round((maxDrawValue * 3) / 4)}</span>
              <span>{maxDrawValue}+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
