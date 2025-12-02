import { useState, useEffect } from 'react';
import useFetch from "../../hooks/useFetch"; // Assuming you have a custom fetch hook
import conf from "../../config"; // Assuming your config file contains the base URL

const useTargetManagement = (page, limit, debouncedSearch) => {
  const [fetchData] = useFetch();
  const [targetData, setTargetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTargets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (debouncedSearch) {
          params.append('search', debouncedSearch);
        }

        const url = `${conf.apiBaseUrl}admin/target-management/targets?${params.toString()}`;
        const res = await fetchData({
          method: 'GET',
          url,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Make sure JWT token is stored correctly
          },
        });

        if (res) {
          setTargetData(res.data); // Assuming the response has a 'data' field
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching target data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, [page, limit, debouncedSearch, fetchData]);

  return { targetData, loading, error };
};

export default useTargetManagement;
