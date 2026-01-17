import React from "react";
import { useRecoilState } from "recoil";
import {
  dashboardTotalStateAtom,
  saleChartAtom,
  CityWiseSalesReportAtom,
  totalUserAtom,
  totalstaffAtom,
} from "../../state/dashboard/DashboardManagementState";
import conf from "../../config/index";
import useFetch from "../useFetch";

function useDashboardManagement() {
  const [fetchData] = useFetch();
  const [dashboardTotals, setDashboardTotals] = useRecoilState(
    dashboardTotalStateAtom
  );
  const [salesChart, setSalesChart] = useRecoilState(saleChartAtom);
  const [salereport, setSaleReport] = useRecoilState(CityWiseSalesReportAtom);

  const [staffCountByMonth, setStaffCountByMonth] =
    useRecoilState(totalstaffAtom);

  const [userReport, setUserReport] = useRecoilState(totalUserAtom);

  const [loading, setLoading] = React.useState(false);

  const fetchDashboardTotals = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/dashboard/totalCounts`
      });
      if (res) {
        setDashboardTotals(res.data);
        setLoading(true);
        return res.data;
      } else {
        console.error(res.message);
        return null;
      }
    } catch (error) {
      console.error("Dashboard totals error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesChartData = async ({
    country,
    state,
    city,
    periodType = "today",
  }) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (country) params.append("country", country);
      if (state) params.append("state", state);
      if (city) params.append("city", city);
      params.append("type", periodType);

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/dashboard/salesChart?${params.toString()}`
      });

      if (res) {
        setSalesChart(res.data);
        setLoading(false);
        return res.data;
      } else {
        setSalesChart([]);
        return null;
      }
    } catch (error) {
      console.error("Sales chart error:", error);
      setSalesChart([]);
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const fetchSalesReport = async ({
    country = "All",
    type = "yearly", // today | weekly | monthly | yearly | year-wise
    year = new Date().getFullYear(),
  }) => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        country,
        type,
      });

      if (type === "year-wise") {
        params.append("year", year);
      }

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/dashboard/cityWiseSalesReport?${params.toString()}`,
      });

      if (res.success) {
        setSaleReport({
          country,
          type,
          year,
          monthlyData: res.data,
        });
        return res.data;
      } else {
        setSaleReport({ country, type, year, monthlyData: [] });
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("City sales report error:", error);
      setSaleReport({ country, type, year, monthlyData: [] });
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCountByMonth = async ({
    year,
    country = "All",
    state = "All",
    city = "All",
  }) => {
    if (!year) {
      setUserReport({ year: null, monthlyData: [] });
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        year,
        country,
        state,
        city,
      });

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/dashboard/userCountByMonth?${params.toString()}`,
      });

      if (res) {
        setUserReport(res.data);
        setLoading(false);
        return res.data;
      } else {
        setUserReport({ year, monthlyData: [] });
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("User count by month error:", error);
      setUserReport({ year, monthlyData: [] });
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffCountByMonth = async ({
    year,
    country = "All",
    state = "All",
    city = "All",
  }) => {
    if (!year) {
      setStaffCountByMonth({ year: null, monthlyData: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/dashboard/staffCountByMonth?year=${year}&country=${country}&state=${state}&city=${city}`,
      });

      if (res) {
        setStaffCountByMonth(res.data);
        setLoading(false);
      }
    } catch (e) {
      setStaffCountByMonth({ year, monthlyData: [] });
      setLoading(false);

    } finally {
      setLoading(false);
    }
  };

  return {
    fetchDashboardTotals,
    dashboardTotals,
    loading,
    fetchSalesChartData,
    salesChart,
    fetchSalesReport,
    fetchStaffCountByMonth,
    fetchUserCountByMonth,
  };
}

export default useDashboardManagement;
