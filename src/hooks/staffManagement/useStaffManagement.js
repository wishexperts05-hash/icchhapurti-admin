import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { toast } from "react-toastify";
import useFetch from "../useFetch";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmBlock, confirmUnblock } from "../../utils/alertToast";
import { staffDetailsAtom, staffListAtom } from '../../state/staffManagement/staffManagementState';
import { data } from 'react-router-dom';


const useStaffManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [staffList, setStaffList] = useRecoilState(staffListAtom);
    const [staffDetail, setStaffDetail] = useRecoilState(staffDetailsAtom);

    const fetchStaffList = async (page, limit, debouncedSearch) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (debouncedSearch) {
                params.append('search', debouncedSearch.trim());
            }
            const url = `${conf.apiBaseUrl}admin/staff/get-staff?${params.toString()}`;
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
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching staff details:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const addStaff = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/staff/add-staff`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error adding staff:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateStaff = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/staff/update-staff/${id}`,
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
                toast.error(
                    error?.response?.data?.message
                );
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    const resetStaffDetails = () => {
        setStaffDetail(null);
    };

    return {
        fetchStaffList, loading, staffList, staffDetail, fetchStaffDetails, addStaff, resetStaffDetails,
        updateStaff, updateStatus
    };
}

export default useStaffManagement