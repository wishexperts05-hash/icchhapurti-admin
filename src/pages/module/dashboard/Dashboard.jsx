import React, { useRef, useState } from 'react';
import { LayoutDashboard, ChevronRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import BreadCrumb from '../../../components/uiComponent/BreadCrumb';
import PagePath2 from '../../../components/uiComponent/PagePath2'
import { dashboard1Icon,dashboard2Icon,dashboard3Icon,dashboard4Icon } from '../../../assets/Dashboardicon/dashboardicon';

// StatCard Component
const StatCard = ({ title, value, change, icon, variant }) => {
  const bgColors = {
    success: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
    info: "bg-gradient-to-br from-cyan-50 to-white border-cyan-200",
    purple: "bg-gradient-to-br from-purple-50 to-white border-purple-200",
    warning: "bg-gradient-to-br from-amber-50 to-white border-amber-200",
    orange: "bg-gradient-to-br from-orange-50 to-white border-orange-200",
  };

  return (
    <div className={`min-w-[320px] flex-shrink-0 border-2 shadow-md rounded-2xl ${bgColors[variant]} cursor-grab active:cursor-grabbing select-none`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
            <p className="text-4xl font-bold tracking-tight text-gray-900">{value}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
              <TrendingUp size={12} strokeWidth={2.5} />
              <span className="text-xs font-semibold">{change}</span>
            </div>
          </div>
          <div className="w-20 h-20 flex items-center justify-center text-5xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

// UserChart Component
const UserChart = () => {
  const [selectedYear, setSelectedYear] = useState("thisyear");
  
  const userData = [
    { month: "Jan", users: 620 },
    { month: "Feb", users: 580 },
    { month: "Mar", users: 450 },
    { month: "Apr", users: 630 },
    { month: "May", users: 680 },
    { month: "Jun", users: 520 },
    { month: "Jul", users: 540 },
    { month: "Aug", users: 720 },
    { month: "Sept", users: 560 },
    { month: "Oct", users: 710 },
    { month: "Nov", users: 520 },
    { month: "Dec", users: 800 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="thisyear">This Year</option>
            <option value="lastyear">Last Year</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
        <div className="pointer-events-none">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
              />
              <Bar 
                dataKey="users" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
                maxBarSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// StaffChart Component
const StaffChart = () => {
  const [selectedYear, setSelectedYear] = useState("thisyear");
  
  const staffData = [
    { month: "Jan", staff: 680 },
    { month: "Feb", staff: 550 },
    { month: "Mar", staff: 430 },
    { month: "Apr", staff: 620 },
    { month: "May", staff: 660 },
    { month: "Jun", staff: 510 },
    { month: "Jul", staff: 530 },
    { month: "Aug", staff: 700 },
    { month: "Sept", staff: 540 },
    { month: "Oct", staff: 690 },
    { month: "Nov", staff: 510 },
    { month: "Dec", staff: 850 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Total Staff</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="thisyear">This Year</option>
            <option value="lastyear">Last Year</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
        <div className="pointer-events-none">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
              />
              <Bar 
                dataKey="staff" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
                maxBarSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// LuckyDrawChart Component
const LuckyDrawChart = () => {
  const luckyDrawData = [
    { name: "New Year", entries: 60000, paid: 15000 },
    { name: "Diwali Dhamak", entries: 50000, paid: 12000 },
    { name: "Diwali Dhamak", entries: 52000, paid: 13000 },
    { name: "Diwali Dhamak", entries: 53000, paid: 13500 },
    { name: "Diwali Dhamak", entries: 54000, paid: 14000 },
    { name: "Diwali Dhamak", entries: 55000, paid: 14500 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Lucky Draw Stats</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Total Entries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>Total Amount Paid</span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={luckyDrawData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `₹ ${value / 1000}K`}
              />
              <Bar 
                dataKey="entries" 
                fill="#22c55e" 
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
              <Bar 
                dataKey="paid" 
                fill="#facc15" 
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
            
            <BreadCrumb
                linkText={[
                    
                    { text: "Dashboard" },
                ]}
            />
      
            {/* Header Bar */}
            <PagePath2
                title="Dashboard"/>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Scrollable Stat Cards */}
        <div className="relative">
          <div 
            ref={scrollContainerRef} 
            className="w-full overflow-x-scroll scroll-smooth pb-4 px-1"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollbarWidth: 'none',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <style>
              {`
                .w-full.overflow-x-scroll::-webkit-scrollbar {
                  height: 0px;
                  display: none;
                }
              `}
            </style>
            <div className="flex gap-6">
              <StatCard
                title="Total User"
                value="300K"
                change="+5% This Month"
                icon="👥"
                variant="success"
              />
              <StatCard
                title="Total Staff"
                value="50K"
                change="+5% This Month"
                icon="👨‍💼"
                variant="purple"
              />
              <StatCard
                title="Total Orders"
                value="2.5K"
                change="+5% This Month"
                icon="🛒"
                variant="info"
              />
              <StatCard
                title="Total Sales"
                value="1.8K"
                change="+8% This Month"
                icon="📦"
                variant="warning"
              />
              <StatCard
                title="Total App Installed"
                value="₹45L"
                change="+12% This Month"
                icon="💰"
                variant="orange"
              />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:gap-8">
          <div>
            <UserChart />
          </div>
          <div>
            <StaffChart />
          </div>
          <div>
            <LuckyDrawChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;