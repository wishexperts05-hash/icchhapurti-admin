import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { useRecoilState } from 'recoil';
import { orderDetailsAtom, orderListAtom } from '../../state/orderManagement/orderManagementState';

const useOrderManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [orderList, setOrderList] = useRecoilState(orderListAtom);
    const [orderDetails, setOrderDetails] = useRecoilState(orderDetailsAtom);

    const fetchOrderList = async (page, limit, search, status, userType, startDate, endDate ) => {
        setLoading(true);
        try {
          let url = `${conf.apiBaseUrl}admin/orders/getAllOrders?page=${page || 1}&limit=${limit || ""}`;
          if (search && search.trim() !== "") {
              url += `&search=${encodeURIComponent(search.trim())}`;
          }
          if (status) {
              url += `&status=${encodeURIComponent(status)}`;
          }
          if (userType) {
              url += `&userType=${encodeURIComponent(userType)}`;
          }
          if (startDate) {
              url += `&startDate=${encodeURIComponent(startDate)}`;
          }
          if (endDate) {
              url += `&endDate=${encodeURIComponent(endDate)}`;
          }
            const res = await fetchData({
                method: "GET",
                url: url,
            });
            if (res) {
                setOrderList(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching order list:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

      const fetchOrderDetails = async (id) => {
        setLoading(true);
        try {
          const res = await fetchData({
            method: "GET",
            url: `${conf.apiBaseUrl}admin/orders/getOrderById/user/${id}`,
          });
          if (res) {
            setOrderDetails(res);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      

  return {   
    loading,
    errors,
    orderList,
    orderDetails,
    fetchOrderList,
    fetchOrderDetails,}
}

export default useOrderManagement