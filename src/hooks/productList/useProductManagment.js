import { useState } from "react";
import { useRecoilState } from "recoil";
import { productManagmentListAtom } from "../../state/productManagment/productManagmentState";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";
import { useNavigate } from "react-router-dom";

const useProductManagement = () => {
  const [productList, setProductList] = useRecoilState(
    productManagmentListAtom
  );
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const fetchProductList = async (page, limit, search) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}product/all?page=${page || 1}&limit=${
        limit || ""
      }`;
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetchData({
        method: "GET",
        url,
      });

      if (res) {
        setProductList(res);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const resetProductList = () => {
    setProductList([]);
  };

  

  const updateProduct = async (id, formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}product/edit/${id}`,
        data: formdata,
      });
      if (res) {
        toast.success(res?.message);
        // navigate(`/product-management/product-view/${id}`);
        navigate("/product-management");
        console.log(res);
      }
    } catch (error) {
      console.error(
        "Error updating tiffin restraurant provider details:",
        error
      );
      toast.error(
        error?.response?.data?.message || "An unexpected error occured"
      );
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (formdata) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}product/add`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: formdata,
      });
      if (res) {
        toast.success(res?.message);
        navigate("/product-management");
        setLoading(false);
        console.log(res);
      }
    } catch (error) {
      console.error("Error creating tiffin restraurant provider:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occured"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetailById = async (id) => {
    setProductDetail(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}product/${id}`,
      });
      if (res) {
        setProductDetail(res);
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching tiffin restraunt provider details:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetProductDetails = () => {
    setProductDetail(null);
  };

  const deleteProductListID = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this Product?"
    );
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await fetchData({
          method: "DELETE",
          url: `${conf.apiBaseUrl}product/delete/${id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
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
        console.error("Error deleting  product:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchAllDomesticShippingRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${conf.apiBaseUrl}admin/shipping/domestic`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        // Return the whole response so component can use items, total, etc.
        return data;
      } else {
        console.log(data.message || "Failed to fetch shipping rates");
        return null;
      }
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInternationalShippingRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/shipping/international`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();

      if (data.success) {
        return data; // return full response
      } else {
        console.log(
          data.message || "Failed to fetch international shipping rates"
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching international shipping rates:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch country + currency list
  const fetchCountries = async () => {
    try {
      const res = await fetch(`${conf.apiBaseUrl}admin/country/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setCountries(data.countries);
      } else {
        toast.error("Failed to load country list");
      }
    } catch (err) {
      console.error("Error fetching country list:", err);
      toast.error("Error fetching country list");
    }
  };

  // ADD DOMESTIC SHIPPING RATE
  const addDomesticShippingRate = async (payload) => {
    try {
      const res = await fetch(`${conf.apiBaseUrl}admin/shipping/domestic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      return await res.json();
    } catch (err) {
      console.error("Failed to add domestic shipping cost", err);
      return null;
    }
  };

  const addInternationalShippingRate = async (payload) => {
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}admin/shipping/international`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      return await res.json();
    } catch (err) {
      console.error("Failed to add international shipping cost:", err);
      return null;
    }
  };
    
  // 🔹 Get Single Domestic Shipping Rate By ID
const fetchDomesticShippingRateById = async (id) => {
  setLoading(true);
  try {
    const res = await fetch(`${conf.apiBaseUrl}admin/shipping/domestic/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.item || null;
  } catch (err) {
    console.error("Error fetching domestic shipping rate:", err);
    return null;
  } finally {
    setLoading(false);
  }
};

const updateDomesticShippingRate = async (id, payload) => {
  setLoading(true);
  try {
    const res = await fetch(`${conf.apiBaseUrl}admin/shipping/domestic/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to update domestic shipping rate:", err);
    return null;
  } finally {
    setLoading(false);
  }
};


// 🔹 Get Single International Shipping Rate By ID
const fetchInternationalShippingRateById = async (id) => {
  setLoading(true);
  try {
    const res = await fetch(`${conf.apiBaseUrl}admin/shipping/international/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    console.log("International By ID Response => ", data);

    return data.item || data.data || data.shippingRate || data;

  } catch (err) {
    console.error("Error fetching international shipping rate:", err);
    return null;
  } finally {
    setLoading(false);
  }
};

const updateInternationalShippingRate = async (id, payload) => {
  setLoading(true);
  try {
    const res = await fetch(`${conf.apiBaseUrl}admin/shipping/international/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating international shipping rate:", err);
    return null;
  } finally {
    setLoading(false);
  }
};


  return {
    loading,
    productList,
    fetchProductList,
    resetProductList,
    productDetail,
    addProduct,
    updateProduct,
    fetchProductDetailById,
    resetProductDetails,
    deleteProductListID,
    fetchAllDomesticShippingRates,
    fetchAllInternationalShippingRates,
    fetchCountries,
    countries,
    addDomesticShippingRate,
    addInternationalShippingRate,
      fetchDomesticShippingRateById,
      updateDomesticShippingRate,
  fetchInternationalShippingRateById,
  updateInternationalShippingRate,
  };
};

export default useProductManagement;
