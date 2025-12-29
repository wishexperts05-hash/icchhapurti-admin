import React, { useEffect, useRef, useState } from "react";
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
import useReportAndAnalytics from "../../../../hooks/reportAndAnalytics/useReportAndAnalytics";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const StatCard = ({ title, value, change, icon, variant }) => {
  const bgColors = {
    success: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
    info: "bg-gradient-to-br from-cyan-50 to-white border-cyan-200",
    purple: "bg-gradient-to-br from-purple-50 to-white border-purple-200",
    warning: "bg-gradient-to-br from-amber-50 to-white border-amber-200",
    orange: "bg-gradient-to-br from-orange-50 to-white border-orange-200",
  };

  return (
    <div
      className={`
        min-w-[240px]
        sm:min-w-[260px]
        md:min-w-[300px]
        lg:min-w-[340px]
        xl:min-w-[380px]
        flex-shrink-0
        border-2 shadow-md rounded-2xl
        ${bgColors[variant]}
        cursor-grab active:cursor-grabbing select-none
      `}
    >
      <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <p className="text-xs font-semibold text-gray-600  first-letter-capital tracking-wider">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {value}
            </p>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-3xl sm:text-4xl">
            {icon}
          </div>
        </div>

        {change && (
          <div className="w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
            <TrendingUp size={12} strokeWidth={2.5} />
            <span className="text-xs font-semibold">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const LuckyDrawAnalysis = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { fetchAnalytics, loading, fetchRecentWinners, fetchOngoingLuckyDraw } =
    useReportAndAnalytics();
  const [analytics, setAnalytics] = useState(null);
  const [ongoingDraw, setOngoingDraw] = useState(null);
  const [winnerData, setWinnerData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  useEffect(() => {
    loadOngoingDraw();
  }, []);

  const loadOngoingDraw = async () => {
    const res = await fetchOngoingLuckyDraw();
    if (res?.success) {
      setOngoingDraw(res.data);
    }
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      const res = await fetchAnalytics();
      if (res?.data) {
        setAnalytics(res.data);
      }
    };

    loadAnalytics();
  }, []);

  useEffect(() => {
    loadWinners(pagination.currentPage, pagination.limit);
  }, [pagination.currentPage, pagination.limit]);

  const loadWinners = async (page, limit) => {
    const res = await fetchRecentWinners({ page, limit });

    if (res?.success) {
      setWinnerData(res.data || []);
      setPagination(res.pagination);
    }
  };

  const dailyTicketData =
    analytics?.dailyTicketDistribution?.map((item) => ({
      day: item.day,
      user: item.userTickets,
      staff: item.staffTickets,
    })) || [];

  const ratioData = [
    {
      name: "User",
      value: analytics?.ticketDistributionByUserType?.user || 0,
      color: "#2563eb",
    },
    {
      name: "Staff",
      value: analytics?.ticketDistributionByUserType?.staff || 0,
      color: "#facc15",
    },
  ];

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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Lucky Draw ID", field: "luckyDrawId" },
    { header: "Draw Name", field: "drawName" },
    { header: "Start Date", field: "startDate" },
    { header: "End Date", field: "endDate" },
    { header: "Status", field: "status" },
  ];

  const columns2 = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Name", field: "winnerName" },
    { header: "Ticket No", field: "ticketNumber" },
    { header: "Draw Id", field: "drawId" },
    { header: "Draw Name", field: "drawName" },
    { header: "Type", field: "userType" },
  ];

  const ongoingDrawRows = ongoingDraw
    ? [
        {
          srNo: 1,
          luckyDrawId: ongoingDraw.eventId,
          drawName: ongoingDraw.eventName,
          startDate: formatDate(ongoingDraw.startDate),
          endDate: formatDate(ongoingDraw.endDate),
          status: ongoingDraw.status,
        },
      ]
    : [];

  // const totalItems = tableData.length;

  // const totalPages = Math.ceil(totalItems / itemsPerPageDraws);
  // const startIndex = (currentPageDraws - 1) * itemsPerPageDraws;
  // const endIndex = startIndex + itemsPerPageDraws;
  // const currentItems = tableData.slice(startIndex, endIndex);

  // Pagination for winners table
  const totalItems2 = pagination.totalRecords;
  const totalPages2 = pagination.totalPages;
  const startIndex2 = (currentPageWinners - 1) * itemsPerPageWinners;
  const endIndex2 = startIndex2 + itemsPerPageWinners;
  const currentItems2 = winnerData;

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[
          { text: "Reports & Analytics" },
          { text: "Lucky Draw Analysis" },
        ]}
      />
      <PagePath2 title="Lucky Draw Analysis" />

      <div className="max-w-[2000px]  flex flex-col ">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-4 px-1"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollbarWidth: "none",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <style>
              {`
                  .hide-scrollbar::-webkit-scrollbar {
                    height: 0px;
                    display: none;
                  }
                `}
            </style>

            <div className="flex gap-4 mb-6 hide-scrollbar">
              <StatCard
                title="Total Lucky Draw Events"
                value={analytics?.totalLuckyDrawEvents || 0}
                change="2.4% from past month"
                icon="🎯"
                variant="success"
              />

              <StatCard
                title="Total User Participated"
                value={analytics?.totalParticipants || 0}
                change="3.5% from past month"
                icon="👨‍💼"
                variant="purple"
              />

              <StatCard
                title="Total Ticket Issued"
                value={analytics?.totalTicketsIssued || 0}
                change="3.5% from past month"
                icon="🎟️"
                variant="info"
              />

              <StatCard
                title="Total Winners"
                value={analytics?.totalWinners || 0}
                change="2.6% from past month"
                icon="🏆"
                variant="orange"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">
            Daily Ticket Distribution
          </h3>
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
              <Pie
                data={ratioData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={0}
                paddingAngle={0}
              >
                {ratioData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex gap-4">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600" /> User :{" "}
              {analytics?.ticketDistributionByUserType?.user || 0}{" "}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400" /> Staff{" "}
              {analytics?.ticketDistributionByUserType?.staff || 0}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Ongoing Lucky Draws</h3>
          </div>

          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <DataTable
              columns={columns}
              data={ongoingDrawRows}
              currentPage={currentPageDraws}
              usersPerPage={itemsPerPageDraws}
            />
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalRecords}
              itemsPerPage={pagination.limit}
              onPageChange={(newPage) =>
                setPagination((prev) => ({ ...prev, currentPage: newPage }))
              }
              onItemsPerPageChange={(newLimit) =>
                setPagination((prev) => ({
                  ...prev,
                  limit: newLimit,
                  currentPage: 1,
                }))
              }
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
            <DataTable
              columns={columns2}
              data={currentItems2}
              currentPage={currentPageWinners}
              usersPerPage={itemsPerPageWinners}
            />
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
  );
};

export default LuckyDrawAnalysis;
