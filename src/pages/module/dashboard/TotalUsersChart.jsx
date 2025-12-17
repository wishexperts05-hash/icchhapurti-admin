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
import { CityWiseSalesReportAtom } from "../../../state/dashboard/DashboardManagementState";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const TotalUsersChart = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState(2025);

  const { fetchUserCountByMonth, loading } = useDashboardManagement();
  const userReport = useRecoilValue(CityWiseSalesReportAtom);
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
            <span className="font-bold text-cyan-500">
              {payload[0].value}
            </span>
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

        <PagePath2
          showSelect
          options={countryOptions}
          selectPlaceHolder="Country"
          onChangeSelectFunc={onChangeCountry}
          showSecondSelect
          secondSelectOptions={stateOptions}
          secondSelectPlaceholder="State"
          onChangeSecondSelect={onChangeState}
        />

        <PagePath2
          showSelect
          options={cityOptions}
          selectPlaceHolder="City"
          onChangeSelectFunc={onChangeCity}
          disabled={!state}
        />

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
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
