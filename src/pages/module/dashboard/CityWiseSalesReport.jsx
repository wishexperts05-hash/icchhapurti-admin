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
import useDashboardManagement from "../../../hooks/dashboard/useDashboardManagement";
import { CityWiseSalesReportAtom } from "../../../state/dashboard/DashboardManagementState";
import useDropdown from "../../../hooks/dropdown/useDropdown";

const CityWiseSalesReport = () => {
  const [country, setCountry] = useState("");
  const [timeframe, setTimeframe] = useState("thisYear");
  const { fetchCountryDropdown, countries } = useDropdown();

  const { fetchSalesReport, loading } = useDashboardManagement();
  const { monthlyData } = useRecoilValue(CityWiseSalesReportAtom);

  const [year, setYear] = useState(2025);

  useEffect(() => {
    fetchSalesReport({
      country,
      year,
    });
  }, [country, year]);

  const cityData =
    monthlyData?.map((item) => ({
      name: item.city || item.month,
      sales: item.count || item.sales,
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

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          City Wise Sales Report
        </h3>
        <div className="flex flex-wrap gap-2">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
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
