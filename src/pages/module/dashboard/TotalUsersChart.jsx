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
import { totalUserAtom } from "../../../state/dashboard/DashboardManagementState";
import Select from "react-select";

const TotalUsersChart = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { fetchUserCountByMonth } = useDashboardManagement();
  const userReport = useRecoilValue(totalUserAtom);
  const monthlyData = userReport?.monthlyData || [];

  const {
    fetchCountryDropdown,
    fetchStatesByCountry,
    fetchCitiesByState,
    countries,
    states,
    cities,
  } = useDropdown();

  /* ---------- Options ---------- */
  const countryOptions = countries.map((c) => c.name);
  const stateOptions = states;
  const cityOptions = cities;

  /* ---------- Handlers ---------- */
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

  /* ---------- Effects ---------- */
  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStatesByCountry(country);
      setState("");
      setCity("");
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      fetchCitiesByState(country, state);
    }
  }, [state]);

  useEffect(() => {
    fetchUserCountByMonth({ year, country, state, city });
  }, [year, country, state, city]);

  /* ---------- Chart Data ---------- */
  const userData =
    monthlyData.map((item) => ({
      month: item.month,
      users: item.count,
    })) || [];

  /* ---------- Tooltip ---------- */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border">
          <p className="text-sm font-semibold">{payload[0].payload.month}</p>
          <p className="text-sm">
            Users:{" "}
            <span className="font-bold text-cyan-500">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      {/* ---------- Filters ---------- */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold">Total Users</h3>

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
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
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
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
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
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
            }}
          />

          {/* Year Dropdown */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 min-w-[100px]"
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- Chart ---------- */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={userData}>
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="users"
            fill="url(#usersGradient)"
            radius={[10, 10, 0, 0]}
            maxBarSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsersChart;
