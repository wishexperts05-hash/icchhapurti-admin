import React, { useRef, useState } from "react";
import { LayoutDashboard, ChevronRight, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import CustomSelect from "../../../../components/uiComponent/CustomSelect";



const dailyTicketData = [
  { day: "Mon", user: 38, staff: 45 },
  { day: "Tue", user: 42, staff: 33 },
  { day: "Wed", user: 45, staff: 55 },
  { day: "Thu", user: 50, staff: 43 },
  { day: "Fri", user: 55, staff: 39 },
  { day: "Sat", user: 48, staff: 34 },
  { day: "Sun", user: 60, staff: 42 },
];

const ratioData = [
  { name: "User", value: 70, color: "#2563eb" },
  { name: "Staff", value: 30, color: "#facc15" },
];

const StatCard = ({ title, value, change, icon, variant }) => {
  const bgColors = {
    success: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
    info: "bg-gradient-to-br from-cyan-50 to-white border-cyan-200",
    purple: "bg-gradient-to-br from-purple-50 to-white border-purple-200",
    warning: "bg-gradient-to-br from-amber-50 to-white border-amber-200",
    orange: "bg-gradient-to-br from-orange-50 to-white border-orange-200",
  };

  return (
    <div className={`w-[280px] flex-shrink-0 border-2 shadow-md rounded-2xl ${bgColors[variant]} cursor-grab active:cursor-grabbing select-none`}>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1 ">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
            <p className="text-4xl font-bold tracking-tight text-gray-900">{value}</p>
          </div>
          <div className="w-20 h-20 flex items-center justify-center text-5xl">{icon}</div>
        </div>
        <div className="w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
          <TrendingUp size={12} strokeWidth={2.5} />
          <span className="text-xs font-semibold">{change}</span>
        </div>
      </div>
    </div>
  );
};

const LuckyDrawAnalysis = () => {
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
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // --- separate pagination state for each table ---
  const [currentPageDraws, setCurrentPageDraws] = useState(1);
  const [itemsPerPageDraws, setItemsPerPageDraws] = useState(10);

  const [currentPageWinners, setCurrentPageWinners] = useState(1);
  const [itemsPerPageWinners, setItemsPerPageWinners] = useState(10);
  // -------------------------------------------------


 





  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Draw Name", field: "drawName" },
    { header: "Start-End Date", field: "startDate" },
    { header: "Start-End Date", field: "endDate" },
    { header: "Status", field: "status" },
  ];
  const columns2 = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Name", field: "name" },
    { header: "Ticket no", field: "ticketNo" },
    { header: "Draw Id", field: "drawId" },
    { header: "Draw Name", field: "drawName" },
    { header: "Type", field: "type" },
  ];

  const [tableData] = useState([
    { srNo: 1, luckyDrawId: "G458", drawName: "Event 1", startDate: "20 Oct 2025", endDate: "25 Oct 2025", status: "Ongoing" },
    { srNo: 2, luckyDrawId: "G459", drawName: "Event 2", startDate: "20 Oct 2025", endDate: "25 Oct 2025", status: "Ongoing" },
    { srNo: 3, luckyDrawId: "G460", drawName: "Event 3", startDate: "20 Oct 2025", endDate: "25 Oct 2025", status: "Ongoing" },
    { srNo: 4, luckyDrawId: "G461", drawName: "Event 4", startDate: "20 Oct 2025", endDate: "25 Oct 2025", status: "Ongoing" },
    { srNo: 5, luckyDrawId: "G462", drawName: "Event 5", startDate: "20 Oct 2025", endDate: "25 Oct 2025", status: "Ongoing" },
    { srNo: 6, luckyDrawId: "G463", drawName: "Event 6", startDate: "21 Oct 2025", endDate: "26 Oct 2025", status: "Ongoing" },
    { srNo: 7, luckyDrawId: "G464", drawName: "Event 7", startDate: "21 Oct 2025", endDate: "26 Oct 2025", status: "Ongoing" },
    { srNo: 8, luckyDrawId: "G465", drawName: "Event 8", startDate: "21 Oct 2025", endDate: "26 Oct 2025", status: "Ongoing" },
    { srNo: 9, luckyDrawId: "G466", drawName: "Event 9", startDate: "22 Oct 2025", endDate: "27 Oct 2025", status: "Ongoing" },
    { srNo: 10, luckyDrawId: "G467", drawName: "Event 10", startDate: "22 Oct 2025", endDate: "27 Oct 2025", status: "Ongoing" },
    { srNo: 11, luckyDrawId: "G468", drawName: "Event 11", startDate: "22 Oct 2025", endDate: "27 Oct 2025", status: "Ongoing" },
    { srNo: 12, luckyDrawId: "G469", drawName: "Event 12", startDate: "23 Oct 2025", endDate: "28 Oct 2025", status: "Ongoing" },
    { srNo: 13, luckyDrawId: "G470", drawName: "Event 13", startDate: "23 Oct 2025", endDate: "28 Oct 2025", status: "Ongoing" },
    { srNo: 14, luckyDrawId: "G471", drawName: "Event 14", startDate: "24 Oct 2025", endDate: "29 Oct 2025", status: "Ongoing" },
    { srNo: 15, luckyDrawId: "G472", drawName: "Event 15", startDate: "24 Oct 2025", endDate: "29 Oct 2025", status: "Ongoing" },
  ]);

  const [winnerData] = useState([
    { srNo: 1, name: "John Doe", ticketNo: "TKT-45678", drawId: "LD-001", drawName: "Event 1", drawDate: "25 Oct 2025", type: "User" },
    { srNo: 2, name: "John Doe", ticketNo: "TKT-45679", drawId: "LD-002", drawName: "Event 2", drawDate: "25 Oct 2025", type: "Staff" },
    { srNo: 3, name: "John Doe", ticketNo: "TKT-45680", drawId: "LD-003", drawName: "Event 3", drawDate: "25 Oct 2025", type: "Staff" },
    { srNo: 4, name: "John Doe", ticketNo: "TKT-45681", drawId: "LD-004", drawName: "Event 4", drawDate: "25 Oct 2025", type: "User" },
    { srNo: 5, name: "John Doe", ticketNo: "TKT-45682", drawId: "LD-005", drawName: "Event 5", drawDate: "25 Oct 2025", type: "User" },
    { srNo: 6, name: "John Doe", ticketNo: "TKT-45683", drawId: "LD-006", drawName: "Event 6", drawDate: "26 Oct 2025", type: "Staff" },
    { srNo: 7, name: "John Doe", ticketNo: "TKT-45684", drawId: "LD-007", drawName: "Event 7", drawDate: "26 Oct 2025", type: "User" },
    { srNo: 8, name: "John Doe", ticketNo: "TKT-45685", drawId: "LD-008", drawName: "Event 8", drawDate: "26 Oct 2025", type: "Staff" },
    { srNo: 9, name: "John Doe", ticketNo: "TKT-45686", drawId: "LD-009", drawName: "Event 9", drawDate: "27 Oct 2025", type: "User" },
    { srNo: 10, name: "John Doe", ticketNo: "TKT-45687", drawId: "LD-010", drawName: "Event 10", drawDate: "27 Oct 2025", type: "Staff" },
    { srNo: 11, name: "John Doe", ticketNo: "TKT-45688", drawId: "LD-011", drawName: "Event 11", drawDate: "27 Oct 2025", type: "User" },
    { srNo: 12, name: "John Doe", ticketNo: "TKT-45689", drawId: "LD-012", drawName: "Event 12", drawDate: "28 Oct 2025", type: "Staff" },
    { srNo: 13, name: "John Doe", ticketNo: "TKT-45690", drawId: "LD-013", drawName: "Event 13", drawDate: "28 Oct 2025", type: "User" },
    { srNo: 14, name: "John Doe", ticketNo: "TKT-45691", drawId: "LD-014", drawName: "Event 14", drawDate: "29 Oct 2025", type: "User" },
    { srNo: 15, name: "John Doe", ticketNo: "TKT-45692", drawId: "LD-015", drawName: "Event 15", drawDate: "29 Oct 2025", type: "Staff" },
  ]);


  // Pagination for draws table
  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPageDraws);
  const startIndex = (currentPageDraws - 1) * itemsPerPageDraws;
  const endIndex = startIndex + itemsPerPageDraws;
  const currentItems = tableData.slice(startIndex, endIndex);



  // Pagination for winners table
  const totalItems2 = winnerData.length;
  const totalPages2 = Math.ceil(totalItems2 / itemsPerPageWinners);
  const startIndex2 = (currentPageWinners - 1) * itemsPerPageWinners;
  const endIndex2 = startIndex2 + itemsPerPageWinners;
  const currentItems2 = winnerData.slice(startIndex2, endIndex2);



  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb linkText={[{ text: "Reports & Analytics" }, { text: "Luck Draw Analysis" }]} />
      <PagePath2 title="Luck Draw Analysis" />

      <div className="max-w-[2000px]  flex flex-col ">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="w-full  pb-4 px-1"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ scrollbarWidth: "none", cursor: isDragging ? "grabbing" : "grab" }}
          >
            <style>{`.w-full.overflow-x-scroll::-webkit-scrollbar { height: 0px; display: none; }`}</style>
            <div className="w-full flex justify-between mb-6 ">
              <StatCard title="Total Lucky Draw Events" value="3590" change="2.4% from past month" icon="👥" variant="success" />
              <StatCard title="Total User Participated" value="1,48,485" change="3.5% from past month" icon="👨‍💼" variant="purple" />
              <StatCard title="Total Ticket Issued" value="21,48,485" change="3.5% from past month" icon="🛒" variant="info" />
              <StatCard title="Total Winners " value="934" change="2.6% from past month" icon="💰" variant="orange" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Daily Ticket Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyTicketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis />
                <Bar dataKey="user" fill="#2563eb" radius={[8, 8, 0, 0]} />
                <Bar dataKey="staff" fill="#facc15" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">Win Ratio by User Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ratioData} dataKey="value" nameKey="name" outerRadius={110} innerRadius={0} paddingAngle={0}>
                  {ratioData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex gap-4">
              <span className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-600" /> User 70%</span>
              <span className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-400" /> Staff 30%</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Ongoing Lucky Draws</h3>
            </div>

            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <DataTable columns={columns} data={currentItems} currentPage={currentPageDraws} usersPerPage={itemsPerPageDraws} />
              <Pagination
                currentPage={currentPageDraws}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPageDraws}
                onPageChange={setCurrentPageDraws}
                onItemsPerPageChange={(newLimit) => {
                  setItemsPerPageDraws(newLimit);
                  setCurrentPageDraws(1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Recent Winners</h3>
            </div>

            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <DataTable columns={columns2} data={currentItems2} currentPage={currentPageWinners} usersPerPage={itemsPerPageWinners} />
              <Pagination
                currentPage={currentPageWinners}
                totalPages={totalPages2}
                totalItems={totalItems2}
                itemsPerPage={itemsPerPageWinners}
                onPageChange={setCurrentPageWinners}
                onItemsPerPageChange={(newLimit) => {
                  setItemsPerPageWinners(newLimit);
                  setCurrentPageWinners(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyDrawAnalysis;
