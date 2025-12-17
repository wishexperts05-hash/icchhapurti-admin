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
import useDropdown from "../../../hooks/dropdown/useDropdown";
import { totalstaffAtom } from "../../../state/dashboard/DashboardManagementState";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Select from "react-select";

const TotalStaffChart = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [timeframe, setTimeframe] = useState("This Year");
  const { fetchStaffCountByMonth, loading } = useDashboardManagement();
  const staffState = useRecoilValue(totalstaffAtom);
  const monthlyData = staffState?.monthlyData || [];
  const {
    fetchCountryDropdown,
    fetchStatesByCountry,
    fetchCitiesByState,
    countries,
    states,
    cities,
  } = useDropdown();

  const [year, setYear] = useState(2025);
  const countryOptions = countries.map((c) => c.name);
  const stateOptions = states;
  const cityOptions = cities;
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

  // Load countries once
  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (country) {
      fetchStatesByCountry(country);
      setState("");
      setCity("");
    }
  }, [country]);

  // Load cities when state changes
  useEffect(() => {
    if (country && state) {
      fetchCitiesByState(country, state);
    }
  }, [state]);

  // Fetch staff chart data
  useEffect(() => {
    fetchStaffCountByMonth({ year, country, state, city });
  }, [year, country, state, city]);

  const staffData =
    monthlyData?.map((item) => ({
      month: item.month,
      staff: item.count,
    })) || [];

  // Custom tooltip for premium feel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Staff:{" "}
            <span className="font-bold text-teal-500">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Total Staff</h3>
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
          styles={{
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
          }}
        />

        {/* State Dropdown */}
        <Select
          options={stateOptions.map((state) => ({
            label: state,
            value: state,
          }))}
          placeholder="Select State"
          onChange={onChangeState}
          value={state ? { label: state, value: state } : null}
          isClearable
          isLoading={!!country && states.length === 0}
          isDisabled={!country}
          styles={{
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
          }}
        />

        {/* City Dropdown */}
        <Select
          options={cityOptions.map((city) => ({
            label: city,
            value: city,
          }))}
          placeholder="Select City"
          onChange={onChangeCity}
          value={city ? { label: city, value: city } : null}
          isClearable
          isLoading={!!state && cities.length === 0}
          isDisabled={!state}
          styles={{
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
          }}
        />

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 min-w-[100px]"
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
        </select>
      </div>
    </div>

  

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={staffData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="staffGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={1} />
              <stop offset="100%" stopColor="#5EEAD4" stopOpacity={0.9} />
            </linearGradient>
            <filter id="staffShadow" height="200%">
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
            dataKey="month"
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
            cursor={{ fill: "rgba(20, 184, 166, 0.1)" }}
          />
          <Bar
            dataKey="staff"
            fill="url(#staffGradient)"
            radius={[10, 10, 0, 0]}
            maxBarSize={35}
            style={{ filter: "url(#staffShadow)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalStaffChart;
