import React, { useEffect, useRef, useState } from "react";
import { LayoutDashboard, ChevronRight, TrendingUp } from "lucide-react";
import useReportAndAnalytics from "../../../../hooks/reportAndAnalytics/useReportAndAnalytics";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// import { dashboard1Icon,dashboard2Icon,dashboard3Icon,dashboard4Icon } from '../../../assets/Dashboardicon/dashboardicon';
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
// import useReportAndAnalytics from "../../../../hooks/reportAndAnalytics/useReportAndAnalytics";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import CustomSelect from "../../../../components/uiComponent/CustomSelect";

// StatCard Component
const StatCard = ({ title, value, change, icon, variant }) => {
  const bgColors = {
    success: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
    info: "bg-gradient-to-br from-cyan-50 to-white border-cyan-200",
    purple: "bg-gradient-to-br from-purple-50 to-white border-purple-200",
    warning: "bg-gradient-to-br from-amber-50 to-white border-amber-200",
    orange: "bg-gradient-to-br from-orange-50 to-white border-orange-200",
  };

  // const {fetchReport,loading} = useReportAndAnalytics();
  // useEffect(() => {fetchReport()}, [fetchReport]);

  return (
    <div
      className={`min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[380px] 
              flex-shrink-0 border-2 shadow-md rounded-2xl 
              ${bgColors[variant]} cursor-grab active:cursor-grabbing select-none`}
    >
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {title}
            </p>
            <p className="text-4xl font-bold tracking-tight text-gray-900">
              {value}
            </p>
          </div>
          <div className="w-20 h-20 flex items-center justify-center text-5xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const RevenueChart = ({ data }) => {
  const cleanedData =
    data?.map((item) => ({
      month: item.month,
      total: Number(item.total) || 0,
    })) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Revenue Chart</h3>
        </div>

        <div className="pointer-events-none">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cleanedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `₹ ${value}`}
              />
              <Bar
                dataKey="total"
                fill="#22c55e"
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
const Reports = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const {
    loading,
    fetchSalesSegmentation,
    fetchDataReport,
    fetchRevenueChart,
  } = useReportAndAnalytics();
  const [reportData, setReportData] = useState(null);
  const [revenueChart, setRevenueChart] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [product, setProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [value, setValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const loadSalesSegmentation = async () => {
    const response = await fetchSalesSegmentation({
      country,
      state, // your UI uses “region”, API uses “state”
      city,
      region,
      productName: product,
      date: value ? value.toISOString().split("T")[0] : "",
      page: currentPage,
      limit: itemsPerPage,
    });

    if (response?.success) {
      setSalesData(response.data);
      setPagination(response.pagination);
    }
  };
  useEffect(() => {
    loadSalesSegmentation();
  }, [country, city, region, product, value, currentPage, itemsPerPage]);

  const formattedTableData = salesData.map((item, index) => ({
    srNo: (currentPage - 1) * itemsPerPage + index + 1,
    country: item.country,
    state: item.state,
    city: item.city,
    region: item.region || item.state,
    productName: item.productName,
    totalSales: item.totalQuantitySold,
    totalRevenue: `₹${item.totalRevenue}`,
  }));

  useEffect(() => {
    const loadReport = async () => {
      setLoadingData(true);
      const res = await fetchDataReport();
      setReportData(res?.data || null);
      setLoadingData(false);
    };
    loadReport();
  }, []);

  useEffect(() => {
    const loadReport = async () => {
      setLoadingData(true);
      const res = await fetchRevenueChart();
      setRevenueChart(res?.data || null);
      setLoadingData(false);
    };
    loadReport();
  }, []);

  // useEffect(() => {
  //   const loadReport = async () => {
  //     const res = await fetchReport();
  //     setReportData(res?.data || null);
  //   };
  //   loadReport();
  // }, []);

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

  const countryList = [
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "uk", label: "UK" },
  ];

  const cityList = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "pune", label: "Pune" },
  ];

  const regionList = [
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
  ];

  const productList = [
    { value: "mobile", label: "Mobile" },
    { value: "laptop", label: "Laptop" },
    { value: "tv", label: "Smart TV" },
  ];

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Country", field: "country" },
    { header: "State", field: "state" },
    { header: "City", field: "city" },
    { header: "Region", field: "region" },
    { header: "Product Name", field: "productName" },
    { header: "Total Sales(Quantity)", field: "totalSales" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];

  const [tableData] = useState([
    {
      srNo: 1,
      country: "India",
      city: "Mumbai",
      region: "Maharashtra",
      productName: "Pen",
      totalSales: 342,
      totalRevenue: "₹6840",
    },
    {
      srNo: 2,
      country: "India",
      city: "Delhi",
      region: "Delhi (NCR)",
      productName: "Notebook",
      totalSales: 289,
      totalRevenue: "₹8670",
    },
    {
      srNo: 3,
      country: "India",
      city: "Pune",
      region: "Maharashtra",
      productName: "Marker",
      totalSales: 155,
      totalRevenue: "₹4650",
    },
    {
      srNo: 4,
      country: "India",
      city: "Chennai",
      region: "Tamil Nadu",
      productName: "Pen",
      totalSales: 412,
      totalRevenue: "₹8240",
    },
    {
      srNo: 5,
      country: "India",
      city: "Hyderabad",
      region: "Telangana",
      productName: "Highlighter",
      totalSales: 199,
      totalRevenue: "₹5970",
    },
    {
      srNo: 6,
      country: "India",
      city: "Kolkata",
      region: "West Bengal",
      productName: "Notebook",
      totalSales: 278,
      totalRevenue: "₹8340",
    },
    {
      srNo: 7,
      country: "India",
      city: "Siliguri",
      region: "West Bengal",
      productName: "Pen",
      totalSales: 350,
      totalRevenue: "₹7000",
    },
    {
      srNo: 8,
      country: "India",
      city: "Jaipur",
      region: "Rajasthan",
      productName: "Marker",
      totalSales: 233,
      totalRevenue: "₹6990",
    },
    {
      srNo: 9,
      country: "India",
      city: "Ahmedabad",
      region: "Gujarat",
      productName: "Pen",
      totalSales: 310,
      totalRevenue: "₹6200",
    },
    {
      srNo: 10,
      country: "India",
      city: "Bengaluru",
      region: "Karnataka",
      productName: "Highlighter",
      totalSales: 370,
      totalRevenue: "₹11100",
    },
    {
      srNo: 11,
      country: "India",
      city: "Nagpur",
      region: "Maharashtra",
      productName: "Notebook",
      totalSales: 298,
      totalRevenue: "₹8940",
    },
    {
      srNo: 12,
      country: "India",
      city: "Surat",
      region: "Gujarat",
      productName: "Pen",
      totalSales: 187,
      totalRevenue: "₹3740",
    },
  ]);

  const filteredData = tableData.filter((item) => {
    return (
      (country ? item.country.toLowerCase() === country.toLowerCase() : true) &&
      (city ? item.city.toLowerCase() === city.toLowerCase() : true) &&
      (region ? item.region.toLowerCase() === region.toLowerCase() : true) &&
      (product
        ? item.productName.toLowerCase() === product.toLowerCase()
        : true)
    );
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    const res = await fetchDataReport();
    setReportData(res?.data || null);
    setRefreshing(false);
  };

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [country, city, region, product]);

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[{ text: "Reports & Analytics" }, { text: "Reports" }]}
      />

      {/* Header Bar */}
      <PagePath2 title="Reports" />

      <div className="mb-4 flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`border bg-slate-500 text-white px-4 py-2 rounded ${
            refreshing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className=" flex flex-col ">
        {/* Scrollable Stat Cards */}
        {loadingData ? (
          <div className="flex items-center justify-center h-48">
            {/* <p className="text-gray-500 text-lg">Loading report data...</p> */}
            <LoaderSpinner />
          </div>
        ) : (
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
                .w-full.overflow-x-scroll::-webkit-scrollbar {
                  height: 0px;
                  display: none;
                }
              `}
              </style>
              <div className="w-full flex justify-between mb-6 ">
                <StatCard
                  title="Total Revenue"
                  value={reportData?.totalRevenue || "₹0"}
                  icon="👥"
                  variant="success"
                />
                <StatCard
                  title="Avg . Order Value"
                  value={reportData?.averageOrderValue || "₹0"}
                  icon="👨‍💼"
                  variant="purple"
                />
                <StatCard
                  title="Total App Downloaded"
                  value={reportData?.totalAppDownloaded || "0"}
                  icon="🛒"
                  variant="info"
                />
              </div>
              <div className="w-full flex justify-between mb-6 ">
                <StatCard
                  title="Total Coin Distributed"
                  value={reportData?.totalCoinDistributed || "0"}
                  icon="💰"
                  variant="orange"
                />
                <StatCard
                  title="Total Coin Redemption"
                  value={reportData?.totalCoinRedeemed || "0"}
                  icon="📦"
                  variant="warning"
                />

                <StatCard
                  title="Offer Usage"
                  value={reportData?.totalCoinRedeemed || "0"}
                  icon="💰"
                  variant="orange"
                />
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 lg:gap-8">
          {loadingData ? (
            <div className="flex items-center justify-center h-48">
              {/* <p className="text-gray-500 text-lg">Loading report data...</p> */}
              <LoaderSpinner />
            </div>
          ) : (
            <div>
              <RevenueChart data={revenueChart?.monthlyRevenue} />
            </div>
          )}
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Revenue Chart</h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {/* Country */}
                <div className="relative">
                  <CustomSelect
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    options={countryList}
                  />
                  {country && (
                    <MdCancel
                      onClick={() => setCountry("")}
                      className="absolute right-2 top-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>

                {/* City */}
                <div className="relative">
                  <CustomSelect
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    options={cityList}
                  />
                  {city && (
                    <MdCancel
                      onClick={() => setCity("")}
                      className="absolute right-2 top-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>

                {/* Region */}
                <div className="relative">
                  <CustomSelect
                    label="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    options={regionList}
                  />
                  {region && (
                    <MdCancel
                      onClick={() => setRegion("")}
                      className="absolute right-2 top-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>

                {/* Product */}
                <div className="relative">
                  <CustomSelect
                    label="Product Name"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    options={productList}
                  />
                  {product && (
                    <MdCancel
                      onClick={() => setProduct("")}
                      className="absolute right-2 top-9 text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>

                {/* DatePicker */}
                <div className="relative z-50">
                  <DatePicker
                    onChange={setValue}
                    value={value}
                    calendarIcon={value ? null : <IoCalendarClearOutline />}
                    clearIcon={null} // hide default clear icon
                    format="dd/MM/yyyy"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
                  {value && (
                    <MdCancel
                      onClick={() => setValue(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <DataTable
                columns={columns}
                data={formattedTableData}
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

export default Reports;
