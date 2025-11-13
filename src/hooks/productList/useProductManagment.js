import { useState } from "react";
import { useRecoilState } from "recoil";
import { productManagmentListAtom } from "../../state/productManagment/productManagmentState";
import useFetch from "../useFetch"; 
import { toast } from "react-toastify";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

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



  return {
    loading,
    productList,
    fetchProductList,
    resetProductList,
    deleteProductListID
  };
};

export default useProductManagement;

