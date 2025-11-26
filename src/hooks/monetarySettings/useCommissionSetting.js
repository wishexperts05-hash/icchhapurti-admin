import React, { useState } from 'react'
import { commsissionSettingDetailsAtom, commsissionSettingsListAtom, withdrawSettingAtom } from '../../state/monetarySetting/monetarySettingState';
import { useRecoilState } from 'recoil';
import useFetch from '../useFetch';
import { toast } from "react-toastify";
import conf from "../../config/index";

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

  return { fetchCommissionSettingsList, loading, commissionSettingList, commissionSettingDetails, fetchCommissionSettingDetails};
}

export default useCommissionSetting