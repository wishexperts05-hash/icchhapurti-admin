import React, { useEffect, useState } from "react";
import { LayoutDashboard, ChevronRight, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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

import useReportAndAnalytics from "../../../../hooks/reportAndAnalytics/useReportAndAnalytics";

const HighestSales = () => {
  const { fetchStaffPerformance, loading } = useReportAndAnalytics();
  const [selectedYear, setSelectedYear] = useState("thisWeek");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAchievers = async () => {
      const res = await fetchStaffPerformance(selectedYear);
      if (res?.success) {
        const achievers = res.data?.achievers || [];
        const maxValue = Math.max(...achievers.map((a) => a.totalRevenue), 0);

        const formatted = achievers.map((a) => ({
          name: a.staffName,
          value: a.totalRevenue,
          max: maxValue,
        }));

        setData(formatted);
      }
    };

    getAchievers();
  }, [selectedYear]);

  const dropdownData = [
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "thisYear", label: "This Year" },
  ];
  return (
    <div style={{ width: "100%", maxWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Highest Sales Achievers
        </h3>

        <CustomSelect
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          options={dropdownData}
        />
      </div>

      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && <p>No achievers found</p>}

      {!loading &&
        data.map((item, i) => (
          <div key={i} style={{ marginBottom: "25px" }}>
            {/* Name and Amount */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <span>{item.name}</span>
              <div
                style={{
                  width: "85%",
                  height: "7px",
                  background: "#eaeaea",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Filled Portion */}
                <div
                  style={{
                    width: `${(item.value / item.max) * 100}%`,
                    height: "100%",
                    background: "#d4a017",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
              <span style={{ color: "#d4a017", fontWeight: 600 }}>
                ₹{item.value}k
              </span>
            </div>
            {/* Progress Bar Background */}
          </div>
        ))}
    </div>
  );
};

// Main Dashboard Component
const StaffPerformance = () => {
  const { fetchTopStaffByRevenue, loading } = useReportAndAnalytics();
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [type, setType] = useState("");
  const [value, setValue] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const periodTypeOptions = [
    { value: "today", label: "Today" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Yearly" },
  ];

  const fetchData = async () => {
    const payload = {
      date: value ? value.toISOString().split("T")[0] : undefined,
      periodType: type || undefined,
      page: currentPage,
      limit: itemsPerPage,
    };

    const res = await fetchTopStaffByRevenue(payload);

    if (res?.success) {
      setTableData(res.data || []);
      setPagination(res.pagination || null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, value, currentPage, itemsPerPage]);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Staff Name", field: "staffName" },
    { header: "Total Direct Sales Amount", field: "directSalesAmount" },
    { header: "Total Indirect Sales Amount", field: "indirectSalesAmount" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];

  // const [tableData] = useState([
  //   {
  //     srNo: 1,
  //     staffName: "Arlene McCoy",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 500,
  //     type: "direct",
  //     date: "02/11/2025",
  //   },
  //   {
  //     srNo: 2,
  //     staffName: "Wade Warren",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 600,
  //     type: "indirect",
  //     date: "02/12/2025",
  //   },
  //   {
  //     srNo: 3,
  //     staffName: "Ralph Edwards",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 400,
  //     type: "direct",
  //     date: "02/10/2025",
  //   },
  //   {
  //     srNo: 4,
  //     staffName: "Jane Cooper",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 700,
  //     type: "indirect",
  //     date: "02/04/2025",
  //   },
  //   {
  //     srNo: 5,
  //     staffName: "Robert Fox",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 300,
  //     type: "direct",
  //     date: "02/03/2025",
  //   },
  //   {
  //     srNo: 6,
  //     staffName: "Kathryn Murphy",
  //     totalSalesAmount: 1202,
  //     totalIndirectSalesAmount: 800,
  //     type: "indirect",
  //     date: "02/08/2025",
  //   },
  // ]);

  // Filtered data with type and date
  const filteredData = tableData.filter((item) => {
    const matchesType = type;
    // ? item.type.toLowerCase() === type.toLowerCase()
    // : true;

    const matchesDate = value
      ? (() => {
          const selectedDate = new Date(value);
          const itemDateParts = item.date.split("/"); // "dd/MM/yyyy"
          const itemDate = new Date(
            Number(itemDateParts[2]),
            Number(itemDateParts[1]) - 1,
            Number(itemDateParts[0])
          );
          return itemDate.getTime() === selectedDate.getTime();
        })()
      : true;

    return matchesType && matchesDate;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[
          { text: "Reports & Analytics" },
          { text: "Staff Performance" },
        ]}
      />
      {/* Header Bar */}
      <PagePath2 title="Staff Performance" />

      <div className="max-w-[2000px]  flex flex-col ">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div>
              <HighestSales />
            </div>

            <div className="flex items-center justify-between mt-14">
              <div></div>
              <div className="flex gap-4">
                <CustomSelect
                  label="periodType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  options={periodTypeOptions}
                />

                <DatePicker
                  onChange={setValue}
                  value={value}
                  // calendarIcon={<IoCalendarClearOutline />}
                  // clearIcon={<MdCancel />}
                  calendarIcon={value ? null : <IoCalendarClearOutline />} // show only when empty
                  clearIcon={
                    value ? (
                      <MdCancel className="w-5 h-5 text-[#facc15]" />
                    ) : null
                  } // show only when a date exists
                  format="dd/MM/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                  className="custom-ios-picker"
                  onChangeRaw={(e) => e.preventDefault()}
                />
              </div>
            </div>
            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <DataTable
                columns={columns}
                data={currentItems}
                currentPage={currentPage}
                usersPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPerformance;
