import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import useFetch from "../useFetch";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";
import { confirmBlock, confirmUnblock } from "../../utils/alertToast";
import {
  staffDetailsAtom,
  staffListAtom,
} from "../../state/staffManagement/staffManagementState";
import { useNavigate } from "react-router-dom";

const useStaffManagement = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useRecoilState(staffListAtom);
  const [staffDetail, setStaffDetail] = useRecoilState(staffDetailsAtom);
  const [directSales, setDirectSales] = useState("");
  const [indirectSales, setIndirectSales] = useState("");
  const [allInDirectSales, setAllInDirectSales] = useState("");
  const [allDirectSales, setAllDirectSales] = useState("");
  const [dloading, setDloading] = useState(false);
  const [iloading, setIloading] = useState(false);

  const [attendanceList, setAttendanceList] = useState([]);
  const [attendancePagination, setAttendancePagination] = useState({});
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceDetail,setAttendaceDetail] = useState();

  const fetchStaffList = async (page, limit, debouncedSearch) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (debouncedSearch) {
        params.append("search", debouncedSearch.trim());
      }
      const url = `${
        conf.apiBaseUrl
      }admin/staff/get-staff?${params.toString()}`;
      const res = await fetchData({
        method: "GET",
        url,
      });
      if (res) {
        setStaffList(res);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/get-staff/${id}`,
      });

      if (res) {
        setStaffDetail(res);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectSalesById = async (id, type, page = 1, limit = 10) => {
    setDloading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/staff-direct-sales/${id}?type=${type}&page=${page}&limit=${limit}`,
      });

      if (res) {
        setDirectSales(res);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
    } finally {
      setDloading(false);
    }
  };

  const fetchIndirectSalesById = async (id, type, page = 1, limit = 10) => {
    setIloading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/staff-indirect-sales/${id}?type=${type}&page=${page}&limit=${limit}`,
      });
      if (res) {
        setIndirectSales(res);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
    } finally {
      setIloading(false);
    }
  };

  const addStaff = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/staff/add`, // <-- FIXED
        data: data,
      });
      if (res) {
        toast.success(res?.message);
         navigate("/staff-management");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStaff = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/staff/edit/${id}`,
        data: data,
      });
      if (res) {
        toast.success(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, data) => {
    console.log("data in updateStatus:", data.isActive);
    setLoading(true);
    const result =
      data.isActive === true
        ? await confirmUnblock("Do you really want to unblock?")
        : await confirmBlock("Do you really want to block?");
    if (result.isConfirmed) {
      try {
        const res = await fetchData({
          method: "PUT",
          url: `${conf.apiBaseUrl}admin/staff/updateStatus/${id}`,
          data,
        });
        if (res) {
          Swal.fire({
            title: data.isActive === true ? "Unblocked!!" : "Blocked!",
            text: res?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating staff status:", error);
        toast.error(error?.response?.data?.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetStaffDetails = () => {
    setStaffDetail(null);
  };

  const fetchAllDirectSales = async () => {
    // setCountryDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/sales/direct`,
      });
      if (res) {
        setAllDirectSales(res?.data);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllIndirectSales = async () => {
    // setCountryDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/sales/indirect`,
      });
      if (res) {
        setAllInDirectSales(res?.data);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Staff?"
    );
    if (!result.isConfirmed) return;
    setLoading(true);
    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}admin/staff/delete/${id}`,
      });

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Staff Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      return res;
    } catch (error) {
      console.error("Error deleting Staff:", error);
      toast.error(error?.response?.data?.message || "Failed to delete Staff");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffAttendance = async ({
    page = 1,
    limit = 10,
    search = "",
    date = "",
  }) => {
    setAttendanceLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (search) params.append("search", search.trim());
      if (date) params.append("date", date);

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/attendance?${params.toString()}`,
      });

      if (res?.success) {
        setAttendanceList(res.attendance || []);
        setAttendancePagination(res.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to fetch attendance");
    } finally {
      setAttendanceLoading(false);
    }
  };


    const fetchAttendanceById = async (id) => {
    setIloading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/staff/attendance/${id}`,
      });
      if (res) {
        setAttendaceDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
    } finally {
      setIloading(false);
    }
  };

  return {
    fetchStaffList,
    loading,
    staffList,
    staffDetail,
    fetchStaffDetails,
    addStaff,
    resetStaffDetails,
    fetchAllDirectSales,
    allDirectSales,
    deleteStaff,
    fetchAllIndirectSales,
    allInDirectSales,
    updateStaff,
    updateStatus,
    fetchDirectSalesById,
    directSales,
    fetchIndirectSalesById,
    indirectSales,
    dloading,
    iloading,

    fetchAttendanceById,
    attendanceDetail,

    fetchStaffAttendance,
    attendanceList,
    attendancePagination,
    attendanceLoading,
  };
};

export default useStaffManagement;
