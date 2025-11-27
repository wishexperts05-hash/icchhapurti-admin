import React, { useState } from 'react'
import { commsissionSettingDetailsAtom, commsissionSettingsListAtom, withdrawSettingAtom } from '../../state/monetarySetting/monetarySettingState';
import { useRecoilState } from 'recoil';
import useFetch from '../useFetch';
import { toast } from "react-toastify";
import conf from "../../config/index";
import { confirmAlert } from '../../utils/alertToast';
import Swal from 'sweetalert2';

const useCommissionSetting = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [commissionSettingList, setCommissionSettingList] = useRecoilState(commsissionSettingsListAtom);
    const [commissionSettingDetails, setCommissionSettingDetails] = useRecoilState(commsissionSettingDetailsAtom);

    const fetchCommissionSettingsList = async (page, limit, search, userType, salesType) => {
        setLoading(true);
        try {
            let url = `${conf.apiBaseUrl}admin/commissionSetting/getAllCommissionSettings?page=${page || 1}&limit=${limit || ""}`;
            if (search && search.trim() !== "") {
                url += `&search=${encodeURIComponent(search.trim())}`;
            }
            if (userType) {
                url += `&userType=${encodeURIComponent(userType)}`;
            }
            if (salesType) {
                url += `&salesType=${encodeURIComponent(salesType)}`;
            }
            const res = await fetchData({
                method: "GET",
                url,
            });
            if (res) {
                setCommissionSettingList(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching commission settings list:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchCommissionSettingDetails = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/commissionSetting/getCommissionSettingById/${id}`,
            });
            if (res) {
                setCommissionSettingDetails(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching commission setting details:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const deleteCommissionSetting = async (id) => {
        const result = await confirmAlert("Are you sure you want to delete this commission setting?");
        if (!result) return;
        setLoading(true);
        try {
            const res = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}admin/commissionSetting/deleteCommissionSetting/${id}`,
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
        } catch (error) {
            console.error("Error deleting commission setting:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return { fetchCommissionSettingsList, loading, commissionSettingList, commissionSettingDetails, fetchCommissionSettingDetails,
        deleteCommissionSetting
     };
}

export default useCommissionSetting