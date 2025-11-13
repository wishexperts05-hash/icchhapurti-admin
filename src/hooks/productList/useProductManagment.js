import { useState } from "react";
import { useRecoilState } from "recoil";
import { productManagmentListAtom } from "../../state/productManagment/productManagmentState";
import useFetch from "../useFetch"; 
import { toast } from "react-toastify";
import conf from "../../config/index";


const useProductManagement = () => {
  const [productList, setProductList] = useRecoilState(productManagmentListAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch(); 

  const fetchProductList = async (page , limit , search ) => {
    setLoading(true);
    try {
      let url = `${conf.apiBaseUrl}product/all?page=${page || 1}&limit=${limit || ""}`;
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

  return {
    loading,
    productList,
    fetchProductList,
    resetProductList,
  };
};

export default useProductManagement;

