import React from 'react';
import { useRecoilState } from "recoil";
import { reportAndAnalyticsListAtom } from "../../state/reportAndAnalytics/reportAndAnalyticsState";
import conf from "../../config/index";

const useReportAndAnalytics = () => {
  const [reportList, setReportList] = useRecoilState(reportAndAnalyticsListAtom);
  const [loading, setLoading] = React.useState(false);

    const fetchDataReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/reports/update/reports`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();
      if (data.success) {
        return data; // return full response
      } else {
        console.error(data.message || "Failed to fetch reports");
        return null;
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

    const fetchRevenueChart = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/reports/update/revenue-chart`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();
      if (data.success) {
        return data; // return full response
      } else {
        console.error(data.message || "Failed to fetch reports");
        return null;
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesSegmentation = async ({ country, state, city, region, productName, date, page, limit }) => {
  setLoading(true);
  try {
    const queryParams = new URLSearchParams();

    if (country) queryParams.append("country", country);
    if (state) queryParams.append("state", state);
    if (city) queryParams.append("city", city);
    if (region) queryParams.append("region", region);
    if (productName) queryParams.append("productName", productName);
    if (date) queryParams.append("date", date); // format "YYYY-MM-DD"

    queryParams.append("page", page || 1);
    queryParams.append("limit", limit || 10);

    const res = await fetch(
      `${conf.apiBaseUrl}admin/reports/sales-segmentation?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch sales segmentation");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching sales segmentation:", error);
    return null;
  } finally {
    setLoading(false);
  }
};


   const fetchStaffPerformance = async (periodType ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/reports/update/top-sales-achievers?periodType=${periodType || ""} `,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();
      if (data.success) {
        return data; // return full response
      } else {
        console.error(data.message || "Failed to fetch reports");
        return null;
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTopStaffByRevenue = async ({ date, dateFrom, dateTo, periodType, page = 1, limit = 10 }) => {
  setLoading(true);
  try {
    const queryParams = new URLSearchParams();

    if (date) queryParams.append("date", date);
    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);
    if (periodType) queryParams.append("periodType", periodType);

    queryParams.append("page", page);
    queryParams.append("limit", limit);

    const res = await fetch(
      `${conf.apiBaseUrl}admin/reports/top-staff-by-revenue?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch top staff by revenue");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching top staff by revenue:", error);
    return null;
  } finally {
    setLoading(false);
  }
};


    const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/reports/lucky-draw-analytics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();
      if (data.success) {
        return data; // return full response
      } else {
        console.error(data.message || "Failed to fetch reports");
        return null;
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

const fetchRecentWinners = async ({ page = 1, limit = 10 }) => {
  setLoading(true);
  try {
    const res = await fetch(
      `${conf.apiBaseUrl}admin/reports/recent-winners?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch recent winners");

    const data = await res.json();
    return data; // contains winners + pagination
  } catch (error) {
    console.error("Error fetching recent winners:", error);
    return null;
  } finally {
    setLoading(false);
  }
};

const fetchOngoingLuckyDraw = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `${conf.apiBaseUrl}admin/reports/ongoing-lucky-draw`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch ongoing lucky draw");

    const data = await res.json();
    return data; // returns { success, data }
  } catch (error) {
    console.error("Error fetching ongoing lucky draw:", error);
    return null;
  } finally {
    setLoading(false);
  }
};


  return { fetchRevenueChart, loading ,fetchSalesSegmentation,fetchAnalytics,
     fetchDataReport ,fetchStaffPerformance , fetchTopStaffByRevenue,fetchRecentWinners ,fetchOngoingLuckyDraw};
};

export default useReportAndAnalytics;
