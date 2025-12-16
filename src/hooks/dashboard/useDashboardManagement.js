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
  const [salesChart, setSalesChart] = useRecoilState(
    saleChartAtom
  );
   const [salereport, setSaleReport] =
    useRecoilState(CityWiseSalesReportAtom);
    const [staffCountByMonth, setStaffCountByMonth] =
  useRecoilState(totalstaffAtom);

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
  periodType,
}) => {
  if (!periodType) {
    setSalesChart([]);
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(
      `${conf.apiBaseUrl}admin/dashboard/salesChart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          country,
          state,
          city,
          periodType, // today | week | month
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to fetch sales chart");

    const result = await res.json();

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

const fetchSalesReport = async ({ country, year }) => {
    if (!year) {
      setSaleReport({ year: null, monthlyData: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/dashboard/userCountByMonth?year=${year}`,
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
        setSaleReport(result.data);
        return result.data;
      } else {
        setSaleReport({ year, monthlyData: [] });
        return null;
      }
    } catch (error) {
      console.error("User count by month error:", error);
      setSaleReport({ year, monthlyData: [] });
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


  return { fetchDashboardTotals, dashboardTotals, loading,fetchSalesChartData,salesChart,fetchSalesReport,fetchStaffCountByMonth };
}

export default useDashboardManagement;
