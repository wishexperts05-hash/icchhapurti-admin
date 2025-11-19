import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { userDetailsAtom, userListAtom } from '../../state/userManagement/userManagementState';
import { toast } from "react-toastify";
import useFetch from "../useFetch";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmBlock, confirmUnblock } from "../../utils/alertToast";

const useUserManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useRecoilState(userListAtom);
    const [userDetail, setUserDetail] = useRecoilState(userDetailsAtom);

    const fetchUserList = async (page, limit, debouncedSearch) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (debouncedSearch) {
                params.append('search', debouncedSearch.trim());
            }
            const url = `${conf.apiBaseUrl}admin/user/get-user?${params.toString()}`;
            const res = await fetchData({
                method: "GET",
                url,
            });
            if (res) {
                setUserList(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user list:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/user/${id}`,
            });
            if (res) {
                setUserDetail(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const resetUserDetails = () => {
        setUserDetail(null);
    };

    const updateStatus = async (id, data) => {
        setLoading(true);
        const result =
            status === "isActive"
                ? await confirmBlock("Do you really want to block?")
                : await confirmUnblock("Do you really want to unblock?");
        if (result.isConfirmed) {
            try {
                const res = await fetchData({
                    method: "PUT",
                    url: `${conf.apiBaseUrl}admin/user/updateStatus/${id}`,
                    data,
                });
                if (res) {
                    Swal.fire({
                        title: "Blocked!",
                        text: res?.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error updating user status:", error);
                toast.error(
                    error?.response?.data?.message
                );
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return { fetchUserList, fetchUserDetails, resetUserDetails, updateStatus, loading, userList, userDetail };
}

export default useUserManagement