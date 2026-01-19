import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import useReportAndAnalytics from "../../../../hooks/reportAndAnalytics/useReportAndAnalytics";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import ModernDatePicker from "../../../../components/uiComponent/ModernDatePicker";
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
import Select from "react-select";

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
      className={`min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[380px] 
              flex-shrink-0 border-2 shadow-md rounded-2xl 
              ${bgColors[variant]} cursor-grab active:cursor-grabbing select-none`}
    >
      <div className="p-4 sm:p-5 md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="space-y-2 sm:space-y-3 flex-1">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {value}
            </p>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl">
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-2 sm:p-5 md:p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">Revenue Chart</h3>
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

  const { fetchCountryDropdown, countries } = useDropdown();
  const [reportData, setReportData] = useState(null);
  const [revenueChart, setRevenueChart] = useState(null);
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

  // State for filters
  const [filterValues, setFilterValues] = useState({
    country: "",
    state: "",
    city: "",
    region: "",
    product: "",
    periodType: "",
  });

  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  console.log("COuntries", countries);

  const loadSalesSegmentation = async () => {
    const response = await fetchSalesSegmentation({
      country: filterValues.country,
      state: filterValues.state,
      city: filterValues.city,
      region: filterValues.region,
      productName: filterValues.product,
      date: value ? value.toISOString().split("T")[0] : "",
      periodType: filterValues.periodType,
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
  }, [
    filterValues.country,
    filterValues.city,
    filterValues.region,
    filterValues.product,
    value,
    filterValues.periodType,
    currentPage,
    itemsPerPage,
  ]);

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const countryList =
    countries?.map((country) => ({
      value: country.name.toLowerCase(),
      label: country.name,
    })) || [];

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

  const periodTypeOptions = [
    { value: "today", label: "Today" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#2563EB" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #2563EB" : "none",
      minHeight: "40px",
      fontSize: "0.875rem",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      zIndex: 50,
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <BreadCrumb
        linkText={[{ text: "Reports & Analytics" }, { text: "Reports" }]}
      />
      <PagePath2 title="Reports" />
      <div className="flex flex-col">
        {loadingData ? (
          <div className="flex items-center justify-center h-48">
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
              <div className="w-full flex gap-4 mb-4">
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
              <div className="w-full flex gap-4 ">
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

        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {loadingData ? (
            <div className="flex items-center justify-center h-48">
              <LoaderSpinner />
            </div>
          ) : (
            <div>
              <RevenueChart data={revenueChart?.monthlyRevenue} />
            </div>
          )}
        </div>

        <div className="mt-4 bg-white rounded-2xl shadow-xl border border-gray-200 bg-white  mb-4 border-b ">
          <div className="p-2 sm:p-5 md:p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                Revenue Chart
              </h3>
              <div className="relative w-full sm:w-auto">
                <ModernDatePicker
                  value={value}
                  onChange={setValue}
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <Formik
              enableReinitialize
              initialValues={filterValues}
              onSubmit={() => {}}
            >
              {({ values, setFieldValue }) => {
                // Update parent state when Formik values change
                useEffect(() => {
                  setFilterValues(values);
                }, [values]);

                return (
                  <Form>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-3 sm:gap-4">
                        <div className="relative w-full sm:w-auto min-w-[220px]">
                          <Select
                            options={countryList}
                            placeholder="Select Country"
                            value={
                              values.country
                                ? countryList.find(
                                    (opt) => opt.value === values.country
                                  )
                                : null
                            }
                            onChange={(option) =>
                              setFieldValue(
                                "country",
                                option ? option.value : ""
                              )
                            }
                            isClearable
                            styles={selectStyles}
                            className="min-w-[220px]"
                          />
                        </div>

                        <div className="relative w-full sm:w-auto min-w-[210px]">
                          <Select
                            options={cityList}
                            placeholder="Select City"
                            value={
                              values.city
                                ? cityList.find(
                                    (opt) => opt.value === values.city
                                  )
                                : null
                            }
                            onChange={(option) =>
                              setFieldValue("city", option ? option.value : "")
                            }
                            isClearable
                            styles={selectStyles}
                            className="min-w-[210px]"
                          />
                        </div>

                        <div className="relative w-full sm:w-auto min-w-[210px]">
                          <Select
                            options={regionList}
                            placeholder="Select Region"
                            value={
                              values.region
                                ? regionList.find(
                                    (opt) => opt.value === values.region
                                  )
                                : null
                            }
                            onChange={(option) =>
                              setFieldValue(
                                "region",
                                option ? option.value : ""
                              )
                            }
                            isClearable
                            styles={selectStyles}
                            className="min-w-[210px]"
                          />
                        </div>

                        <div className="relative w-full sm:w-auto min-w-[210px]">
                          <Select
                            options={productList}
                            placeholder="Select Product"
                            value={
                              values.product
                                ? productList.find(
                                    (opt) => opt.value === values.product
                                  )
                                : null
                            }
                            onChange={(option) =>
                              setFieldValue(
                                "product",
                                option ? option.value : ""
                              )
                            }
                            isClearable
                            styles={selectStyles}
                            className="min-w-[210px]"
                          />
                        </div>

                        <div className="relative w-full sm:w-auto min-w-[220px]">
                          <Select
                            options={periodTypeOptions}
                            placeholder="Select Period Type"
                            value={
                              values.periodType
                                ? periodTypeOptions.find(
                                    (opt) => opt.value === values.periodType
                                  )
                                : null
                            }
                            onChange={(option) =>
                              setFieldValue(
                                "periodType",
                                option ? option.value : ""
                              )
                            }
                            isClearable
                            styles={selectStyles}
                            className="min-w-[220px]"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200 overflow-x-auto">
              <DataTable
                columns={columns}
                data={formattedTableData}
                currentPage={currentPage}
                usersPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalRecords}
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
