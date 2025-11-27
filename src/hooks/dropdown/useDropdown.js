import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { productDropdownAtom, salesTypeAtom, userTypeAtom } from '../../state/dropdown/dropdownState';

const useDropdown = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [salesType, setSalesType] = useRecoilState(salesTypeAtom);
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const [productDropdown, setProductDropdown] = useRecoilState(productDropdownAtom);

    const fetchSalesType = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/commissionSetting/getCommissionTypeDropdownValues`,
            });
            if (res) {
                setSalesType(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching sales type:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserType = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}admin/commissionSetting/getUserTypeDropdownValues`,
            });
            if (res) {
                setUserType(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user type:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductDropdown = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}product/dropdown`,
            });
            if (res) {
                setProductDropdown(res?.products);
                setLoading(false);
            }   
        } catch (error) {
            console.error("Error fetching product dropdown:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

  return {loading, fetchSalesType, fetchUserType, fetchProductDropdown, salesType, userType, productDropdown}
}

export default useDropdown