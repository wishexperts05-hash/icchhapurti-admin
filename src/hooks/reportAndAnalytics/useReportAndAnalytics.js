import React from 'react';
import { useRecoilState } from "recoil";
import { reportAndAnalyticsListAtom } from "../../state/reportAndAnalytics/reportAndAnalyticsState";
import conf from "../../config/index";

const useReportAndAnalytics = () => {
  const [reportList, setReportList] = useRecoilState(reportAndAnalyticsListAtom);
  const [loading, setLoading] = React.useState(false);

  // const fetchReport = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${conf.apiBaseUrl}admin/reports/getReports`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

  //     const data = await res.json();
  //     if (data.success) {
  //       return data; // return full response
  //     } else {
  //       console.error(data.message || "Failed to fetch reports");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reports:", error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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




  return { fetchRevenueChart, loading ,fetchSalesSegmentation, fetchDataReport  };
};

export default useReportAndAnalytics;
