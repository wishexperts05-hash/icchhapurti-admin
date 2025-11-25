import React, { useState } from 'react'
import { withdrawSettingAtom } from '../../state/monetarySetting/monetarySettingState';
import { useRecoilState } from 'recoil';
import useFetch from '../useFetch';
import { toast } from "react-toastify";
import conf from "../../config/index";

const useWithdrawSetting = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [withdrawSetting, setWithdrawSetting] = useRecoilState(withdrawSettingAtom);

    const fetchWithdrawSetting = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/withdrawSetting/getWithdrawSetting`,
            });
            if (res) {
                setWithdrawSetting(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching withdraw setting:", error);
            setLoading(false);
        }
    };

    const updateWithdrawSetting = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/withdrawSetting/updateWithdrawSetting`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setWithdrawSetting(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating withdraw setting:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }
    };
    
    return { withdrawSetting, loading, fetchWithdrawSetting, updateWithdrawSetting };
}

export default useWithdrawSetting