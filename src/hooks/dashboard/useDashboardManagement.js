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

function useDashboardManagement() {
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
      const res = await fetch(`${conf.apiBaseUrl}admin/dashboard/totalCounts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard totals");

      const result = await res.json();

      if (result.success) {
        setDashboardTotals(result.data);
        return result.data;
      } else {
        console.error(result.message);
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
    // Only add parameters that have values (not empty strings)
    const params = new URLSearchParams();
    
    if (country) params.append("country", country);
    if (state) params.append("state", state);
    if (city) params.append("city", city);
    params.append("type", periodType);
    
    const url = `${conf.apiBaseUrl}admin/dashboard/salesChart?${params.toString()}`;
    console.log("📍 API URL:", url);
    
    const token = sessionStorage.getItem("token");
    console.log("🔑 Token exists:", !!token);
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      console.error("❌ API Error:", res.status, res.statusText);
      throw new Error("Failed to fetch sales chart");
    }
    
    const result = await res.json();
    console.log(" API Response:", result);
    
    if (result.success) {
      setSalesChart(result.data);
      return result.data;
    } else {
      setSalesChart([]);
      return null;
    }
  } catch (error) {
    console.error("Sales chart error:", error);
    setSalesChart([]);
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

      // only send year when backend expects it
      if (type === "year-wise") {
        params.append("year", year);
      }

      const res = await fetch(
        `${
          conf.apiBaseUrl
        }admin/dashboard/cityWiseSalesReport?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch sales report");

      const result = await res.json();

      if (result.success) {
        setSaleReport({
          country,
          type,
          year,
          monthlyData: result.data,
        });
        return result.data;
      } else {
        setSaleReport({ country, type, year, monthlyData: [] });
        return null;
      }
    } catch (error) {
      console.error("City sales report error:", error);
      setSaleReport({ country, type, year, monthlyData: [] });
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

      const res = await fetch(
        `${
          conf.apiBaseUrl
        }admin/dashboard/userCountByMonth?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch user count by month");

      const result = await res.json();

      if (result.success) {
        // ✅ store only `data`
        setUserReport(result.data);
        return result.data;
      } else {
        setUserReport({ year, monthlyData: [] });
        return null;
      }
    } catch (error) {
      console.error("User count by month error:", error);
      setUserReport({ year, monthlyData: [] });
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
      const res = await fetch(
        `${conf.apiBaseUrl}admin/dashboard/staffCountByMonth?year=${year}&country=${country}&state=${state}&city=${city}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        setStaffCountByMonth(result.data);
      } else {
        setStaffCountByMonth({ year, monthlyData: [] });
      }
    } catch (e) {
      setStaffCountByMonth({ year, monthlyData: [] });
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
