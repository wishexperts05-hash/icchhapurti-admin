import { useState, useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import conf from "../../config";

const useTargetManagement = (page, limit, debouncedSearch) => {
  const [fetchData] = useFetch();
  const [targetData, setTargetData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setTargetData(res.data);  // array
          setTotal(res.total);      // ✔ from API total=23
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

  return { targetData, total, loading, error };
};

export default useTargetManagement;
