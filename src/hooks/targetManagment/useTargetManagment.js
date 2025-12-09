import { useState, useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import conf from "../../config";

const useTargetManagement = (page, limit, debouncedSearch) => {
  const [fetchData] = useFetch();
  const [targetData, setTargetData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStaffTarget , setAllStaffTarget] =useState(null);

  useEffect(() => {
    const fetchTargets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (debouncedSearch) params.append("search", debouncedSearch);
        const url = `${conf.apiBaseUrl}admin/target-management/targets?${params.toString()}`;
        const res = await fetchData({
          method: "GET",
          url,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (res) {
          setTargetData(res.data);  
          setTotal(res.total);      
        }
      } catch (err) {
        console.error("Error fetching target data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTargets();
  }, [page, limit, debouncedSearch]);

  const getAllStaffTargets = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url : `${conf.apiBaseUrl}admin/target-management/targets/global`,
                headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
            });
            if (res) {
                setAllStaffTarget(res.data);  
                
            }
        } catch (error) {
            console.error("Error fetching staff details:", error);
            
        } finally {
            setLoading(false);
        }
    };

    const saveGlobalTarget = async (payload) => {
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/target-management/targets`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      data: (payload),
    });

    return res;
  } catch (err) {
    console.error("Error saving global target:", err);
    // throw err;
  }
};


  return { targetData, total, loading, error,getAllStaffTargets, allStaffTarget ,saveGlobalTarget};
};

export default useTargetManagement;
