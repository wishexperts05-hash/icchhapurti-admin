import React, { useState, useEffect } from "react";
import { Pie, Cell, Legend, PieChart, ResponsiveContainer } from "recharts";
import Select from "react-select";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useDashboardManagement from "../../../hooks/dashboard/useDashboardManagement";
import useDropdown from "../../../hooks/dropdown/useDropdown";
import { Tooltip } from "recharts";

const SalesChart = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [timeframe, setTimeframe] = useState("Today");

  const { fetchSalesChartData, salesChart, loading } = useDashboardManagement();

  const {
    fetchCountryDropdown,
    fetchStatesByCountry,
    fetchCitiesByState,
    countries,
    states,
    cities,
  } = useDropdown();

  /* ---------- OPTIONS ---------- */
  const countryOptions = countries.map((c) => c.name);
  const stateOptions = states;
  const cityOptions = cities;

  /* ---------- HANDLERS ---------- */
  const onChangeCountry = (option) => {
    const value = option ? option.value : "";
    setCountry(value);
    setState("");
    setCity("");
  };

  const onChangeState = (option) => {
    const value = option ? option.value : "";
    setState(value);
    setCity("");
  };

  const onChangeCity = (option) => {
    const value = option ? option.value : "";
    setCity(value);
  };

  /* ---------- TIMEFRAME MAP ---------- */
  const mapTimeframeToType = (timeframe) => {
    switch (timeframe) {
      case "Today":
        return "today";
      case "This Week":
        return "weekly";
      case "This Month":
        return "monthly";
      default:
        return "today";
    }
  };

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStatesByCountry(country);
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      fetchCitiesByState(country, state);
    }
  }, [state]);

  useEffect(() => {
    const params = {
      ...(country && { country }),
      ...(state && { state }),
      ...(city && { city }),
      periodType: mapTimeframeToType(timeframe),
    };
    fetchSalesChartData(params);
  }, [country, state, city, timeframe]);

  /* ---------- CHART DATA ---------- */
  const pieData =
    salesChart?.map((item) => ({
      name: item.productName,
      value: item.totalRevenue,
    })) || [];

  // Placeholder data for empty state
  const placeholderData = [{ name: "No Data", value: 1 }];

  const COLORS = [
    "#2563EB",
    "#FACC15",
    "#10B981",
    "#EF4444",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#EC4899",
  ];

  // Custom label to show percentage
  const renderLabel = (entry) => {
    const percent = ((entry.percent || 0) * 100).toFixed(1);
    return `${percent}%`;
  };

  // Custom Legend Component
  const CustomLegend = ({ payload }) => {
    return (
      <div
        className="
        mt-4 px-2
        max-h-[96px]          /* ~4 rows height */
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-gray-300
        scrollbar-track-transparent
      "
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-700 font-medium truncate">
                {entry.value.length > 25
                  ? entry.value.substring(0, 25) + "..."
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];

      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">
            Revenue:{" "}
            <span className="font-bold text-blue-600">
              ₹ {value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  /* ---------- STYLES ---------- */
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#2563EB" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #2563EB" : "none",
      minHeight: "38px",
      fontSize: "0.875rem",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      zIndex: 9999,
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 w-full h-full flex flex-col transition-all duration-200 hover:shadow-lg">
      {/* ---------- HEADER ---------- */}
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Sales Chart</h3>

      {/* ---------- FILTERS ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Country */}
        <Select
          options={countryOptions.map((c) => ({ label: c, value: c }))}
          placeholder="Select Country"
          value={country ? { label: country, value: country } : null}
          onChange={onChangeCountry}
          isClearable
          styles={selectStyles}
          className="w-full"
        />

        {/* State */}
        <Select
          options={stateOptions.map((s) => ({ label: s, value: s }))}
          placeholder="Select State"
          value={state ? { label: state, value: state } : null}
          onChange={onChangeState}
          isClearable
          isDisabled={!country}
          isLoading={!!country && states.length === 0}
          styles={selectStyles}
          className="w-full"
        />

        {/* City */}
        <Select
          options={cityOptions.map((c) => ({ label: c, value: c }))}
          placeholder="Select City"
          value={city ? { label: city, value: city } : null}
          onChange={onChangeCity}
          isClearable
          isDisabled={!state}
          isLoading={!!state && cities.length === 0}
          styles={selectStyles}
          className="w-full"
        />

        {/* Timeframe */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* ---------- PIE CHART ---------- */}
      <div className={`flex-1 flex justify-center items-center `}>
        {loading || !fetchSalesChartData ? (
          <div className="flex w-full items-center justify-center py-20">
            <LoaderSpinner />
          </div>
        ) : pieData.length > 0 ? (
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={pieData.length > 6 ? 90 : 100}
                  dataKey="value"
                  paddingAngle={3}
                  // label={renderLabel}
                  // labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Legend content={<CustomLegend />} />
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={placeholderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={0}
                >
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-8">
              <p className="text-sm text-gray-600 font-semibold mb-1">
                No data available
              </p>
              <p className="text-xs text-gray-500">
                Try adjusting your filters to see results
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
