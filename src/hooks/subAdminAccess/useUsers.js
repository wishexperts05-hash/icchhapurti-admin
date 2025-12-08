import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";
import conf from "../../config";
import useFetch from "../useFetch";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  roleNameListAtom,
  usersAtom,
  usersDetailAtom,
} from "../../state/subAdminAccess/userState";

const useUsers = () => {
  const [fetchData] = useFetch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useRecoilState(usersAtom);
  const [usersDetail, setUsersDetail] = useRecoilState(usersDetailAtom);
  const [roleNameList, setRoleNameList] = useRecoilState(roleNameListAtom);

  const fetchUsers = async (page, limit, search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/users/getAllAdminUsers?${params}`,
      });
      if (res) {
        setUsers(res);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users list:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (id) => {
    setUsersDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/users/getAdminUserById/${id}`,
      });
      if (res) {
        setUsersDetail(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/users/createAdminUser`,
        data: data,
      });
      if (res) {
        toast.success(res?.message);
        setLoading(false);
        return res;
      }
    } catch (err) {
      console.error("Error adding user:", err);
      toast.error(err?.response?.data?.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/users/updateAdminUser/${id}`,
        data: data,
      });
      if (res) {
        toast.success(res?.message);
        setLoading(false);
        return res;
      }
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error(err?.response?.data?.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this user?"
    );
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/users/deleteAdminUser/${id}`,
        });
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: res?.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          setLoading(false);
          return res;
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        setError(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchRoleNames = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/users/getRoleNames`,
      });
      if (res) {
        setRoleNameList(res?.data);
        setLoading(false);
        return res;
      }
    } catch (err) {
      console.error("Error fetching role names:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetUsersDetails = () => {
    setUsersDetail(null);
  };

  const updateUserStatus = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/users/changeActiveStatus/${id}`,
      });
      if (res) {
        toast.success(res?.message);
        fetchUserDetails(id);
        return res;
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      toast.error(err?.response?.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchUsers,
    fetchUserDetails,
    addUser,
    updateUser,
    deleteUser,
    users,
    usersDetail,
    fetchRoleNames,
    roleNameList,
    resetUsersDetails,
    updateUserStatus,
  };
};

export default useUsers;
