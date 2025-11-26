import React, { useEffect, useRef, useState } from "react";
import { LayoutDashboard, ChevronRight, TrendingUp } from "lucide-react";
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

  return (
    <div
      className={`min-w-[380px] flex-shrink-0 border-2 shadow-md rounded-2xl ${bgColors[variant]} cursor-grab active:cursor-grabbing select-none`}
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

const RevenueChart = () => {
  const [selectedYear, setSelectedYear] = useState("thisyear");
  const RevenueData = [
    { month: "Jan", staff: 1000000 },
    { month: "Feb", staff: 150000 },
    { month: "Mar", staff: 100000 },
    { month: "Apr", staff: 50000 },
    { month: "May", staff: 500000 },
    { month: "Jun", staff: 50000 },
    { month: "Jul", staff: 120000 },
    { month: "Aug", staff: 180000 },
    { month: "Sept", staff: 90000 },
    { month: "Oct", staff: 220000 },
    { month: "Nov", staff: 55000 },
    { month: "Dec", staff: 250000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Revenue Chart</h3>
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
            <BarChart data={RevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `₹ ${value / 10000}K`}
              />
              <Bar
                dataKey="staff"
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

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [product, setProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [value, setValue] = useState(null);
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
      <BreadCrumb linkText={[{ text: "Reports & Analytics" },{ text: "Reports" }]} />

      {/* Header Bar */}
      <PagePath2 title="Reports" />

      <div className="max-w-[2000px]  flex flex-col ">
        {/* Scrollable Stat Cards */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="w-full  pb-4 px-1"
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
                value="₹5,0000"
                icon="👥"
                variant="success"
              />
              <StatCard
                title="Avg . Order Value"
                value="₹500"
                icon="👨‍💼"
                variant="purple"
              />
              <StatCard
                title="Total App Downloaded"
                value="15,000"
                icon="🛒"
                variant="info"
              />
            </div>
            <div className="w-full flex justify-between mb-6 ">
              <StatCard
                title="Total Coin Distributed"
                value="50,000"
                icon="💰"
                variant="orange"
              />
              <StatCard
                title="Total Coin Redemption"
                value="15,000"
                icon="📦"
                variant="warning"
              />

              <StatCard
                title="Offer Usage"
                value="500"
                icon="💰"
                variant="orange"
              />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:gap-8">
          <div>
            <RevenueChart />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Revenue Chart</h3>
            </div>

            <div className="flex items-center justify-end">
        

              <div className="flex gap-4">
                <CustomSelect
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  options={countryList}
                />

                <CustomSelect
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  options={cityList}
                />

                <CustomSelect
                  label="Region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  options={regionList}
                />

                <CustomSelect
                  label="Product Name"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  options={productList}
                />

                <DatePicker
        onChange={setValue}
        value={value}
        // calendarIcon={<IoCalendarClearOutline />}
        // clearIcon={<MdCancel />}  
        calendarIcon={value ? null : <IoCalendarClearOutline />}  // show only when empty
  clearIcon={value ? <MdCancel className="w-5 h-5 text-[#facc15]" />: null} // show only when a date exists
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
              <DataTable columns={columns} data={currentItems}   currentPage={currentPage}
               usersPerPage={itemsPerPage}/>
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
