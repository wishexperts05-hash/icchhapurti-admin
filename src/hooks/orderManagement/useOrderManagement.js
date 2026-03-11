import React, { useState } from 'react'
import useFetch from '../useFetch';
import conf from "../../config/index";
import { useRecoilState } from 'recoil';
import { orderDetailsAtom, orderListAtom } from '../../state/orderManagement/orderManagementState';
import { toast } from 'react-toastify';

const useOrderManagement = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const [orderDetails, setOrderDetails] = useRecoilState(orderDetailsAtom);
  const [statusList,setStatusList]=useState()

  const fetchOrderList = async (page, limit, search, status, userType, startDate, endDate) => {
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

  const fetchOrderDetails = async (userType, orderId) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/orders/getOrderById/${userType}/${orderId}`,
      });
      if (res) {
        setOrderDetails(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

    const fetchStatusList = async (status) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/orders/getOrderStatus?currentStatus=${status || ""}`,
      });
      if (res) {
        setStatusList(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

      const updateOrderStatus = async (id, data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}admin/orders/updateOrderStatus/${id}`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating offer:", error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

  const resetOrderDetails = () => {
    setOrderDetails(null);
  }


const bookShippingOrder = async (data) => {
  setLoading(true);
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/bluedart/shipping/book`,
      data: data,
    });

    if (res) {
      toast.success(res?.message);

            if (res?.invoicePdf) {
        const response = await fetch(res.invoicePdf);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Inovoice-${res.awbNumber}.pdf`;
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      }

      // 📥 Force download shipping label
      if (res?.shippingLabel) {
        const response = await fetch(res.shippingLabel);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `shipping-label-${res.awbNumber}.pdf`;
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      }

      return res;
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error(error?.response?.data?.message);
  } finally {
    setLoading(false);
  }
};
            const cancelBookShippingOrder = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}admin/bluedart/shipping/cancel`,
                data: data,
            });
            if (res) {
                toast.success(res?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error(error?.response?.data?.message);
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
    fetchOrderDetails,
    resetOrderDetails,statusList,fetchStatusList,updateOrderStatus, bookShippingOrder,cancelBookShippingOrder
  }
}

export default useOrderManagement