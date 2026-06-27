import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useRecoilValue } from "recoil";
import Select from "react-select";
import useDashboardManagement from "../../../hooks/dashboard/useDashboardManagement";
import { CityWiseSalesReportAtom } from "../../../state/dashboard/DashboardManagementState";
import useDropdown from "../../../hooks/dropdown/useDropdown";

const CityWiseSalesReport = () => {
  const [country, setCountry] = useState("India");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [type, setType] = useState("yearly");

  const {
    fetchCountryDropdown,
    countries,
  } = useDropdown();

  const { fetchSalesReport } = useDashboardManagement();
  const { monthlyData } = useRecoilValue(CityWiseSalesReportAtom);

  /* ---------- Options ---------- */
  const countryOptions = countries.map((c) => c.name);

  /* ---------- Handlers ---------- */
  const onChangeCountry = (option) => {
    const value = option ? option.value : "";
    setCountry(value);
  };

  /* ---------- Effects ---------- */
  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  useEffect(() => {
    fetchSalesReport({ country: country || "All", type, year });
  }, [country, type, year]);

  const cityData =
    monthlyData?.map((item) => ({
      name: item.city || item.productName,
      sales: item.totalRevenue,
    })) || [];

  // Custom tooltip for premium feel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.name}
          </p>
          <p className="text-sm text-gray-600">
            Sales:{" "}
            <span className="font-bold text-orange-500">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#FF6B00" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #FF6B00" : "none",
      "&:hover": { borderColor: "#FF6B00" },
      fontSize: "0.875rem",
      minHeight: "40px",
      minWidth: "150px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#FF6B00"
        : state.isFocused
        ? "#FFE5D1"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
    placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          City Wise Sales Report
        </h3>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Country Dropdown */}
          <Select
            options={countryOptions.map((country) => ({
              label: country,
              value: country,
            }))}
            placeholder="Select Country"
            onChange={onChangeCountry}
            value={country ? { label: country, value: country } : null}
            isClearable
            styles={selectStyles}
          />

          {/* Year Dropdown */}
          <Select
            options={[
              { label: "Today", value: "today" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
              { label: "Yearly", value: "yearly" },
              { label: "Year Wise", value: "year-wise" },
            ]}
            value={{ label: type.replace("-", " "), value: type }}
            onChange={(option) => setType(option.value)}
            placeholder="Select Time Range"
            styles={selectStyles}
          />
          {type === "year-wise" && (
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={cityData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" stopOpacity={1} />
              <stop offset="100%" stopColor="#FDBA74" stopOpacity={0.9} />
            </linearGradient>
            <filter id="barShadow" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
            opacity={0.5}
          />
          <XAxis
            dataKey="name"
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
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(251, 146, 60, 0.1)" }}
          />
          <Bar
            dataKey="sales"
            fill="url(#barGradient)"
            radius={[10, 10, 0, 0]}
            maxBarSize={35}
            style={{ filter: "url(#barShadow)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CityWiseSalesReport;
