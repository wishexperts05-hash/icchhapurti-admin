import { confirmAlert } from "../../utils/alertToast";
import Swal from "sweetalert2";
import conf from "../../config";
import useFetch from "../useFetch";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  usersDropListAtom,
  usersPermissionAtom,
  usersPermissionDetailAtom,
} from "../../state/subAdminAccess/usersPermissionState";

const useUsersPermission = () => {
  const [fetchData] = useFetch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usersPermission, setUsersPermission] =
    useRecoilState(usersPermissionAtom);
  const [usersPermissionDetail, setUsersPermissionDetail] = useRecoilState(
    usersPermissionDetailAtom
  );
  const [usersDropList, setUsersDropList] = useRecoilState(usersDropListAtom);

  const fetchUsersPermission = async (page, limit, search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/user-access/getAllAdminUserAccess?${params}`,
      });
      if (res) {
        setUsersPermission(res);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users permission list:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPermissionDetails = async (id) => {
    setUsersPermissionDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/user-access/getAdminUserAccessById/${id}`,
      });
      if (res) {
        setUsersPermissionDetail(res?.adminUserAccess);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching user permission details:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addUserPermission = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/user-access/createAdminUserAccess`,
        data: data,
      });
      if (res) {
        toast.success(res?.message);
        setLoading(false);
        return res;
      }
    } catch (err) {
      console.error("Error adding user permission:", err);
      toast.error(err?.response?.data?.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateUserPermission = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/user-access/updateAdminUserAccess/${id}`,
        data: data,
      });
      if (res) {
        toast.success(res?.message);
        setLoading(false);
        return res;
      }
    } catch (err) {
      console.error("Error updating user permission:", err);
      toast.error(err?.response?.data?.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserPermission = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this user permission?"
    );
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}admin/user-access/deleteAdminUserAccess/${id}`,
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
        console.error("Error deleting user permission:", err);
        toast.error(err?.response.data.message);
        setError(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchUsersDropList = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/user-access/getAllAdminUserNames`,
      });
      if (res) {
        setUsersDropList(res?.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users permission list:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetUsersPermission = () => {
    setUsersDropList([]);
    setUsersPermissionDetail(null);
  };

  return {
    loading,
    error,
    usersPermission,
    usersPermissionDetail,
    fetchUsersPermission,
    fetchUserPermissionDetails,
    addUserPermission,
    updateUserPermission,
    deleteUserPermission,
    fetchUsersDropList,
    usersDropList,
    resetUsersPermission,
  };
};

export default useUsersPermission;
