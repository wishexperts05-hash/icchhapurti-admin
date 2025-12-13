import { useState } from 'react';
import useFetch from "../../hooks/useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { targetDetailsAtom, targetListAtom } from '../../state/targetManagement/targetManagementState';

const useTargetManagement = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetList, setTargetList] = useRecoilState(targetListAtom)
  const [targetDetails, setTargetDetails] = useRecoilState(targetDetailsAtom);

  const fetchTargetDetails = async () => {
    setTargetDetails(null);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/target-management/targets/global`,
      });
      if (res) {
        setTargetDetails(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching target details:", err);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchTargetList = async (page, limit, search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/target-management/targets?${params.toString()}`,
      })
      if(res){
        setTargetList(res)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching target list:", error);
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const setTarget = async (data) => {
    setLoading(true)
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}admin/target-management/targets`,
        data: data
      });
      if(res){
        toast.success(res?.message)
        setLoading(false)
        return res
      }
    } catch (error) {
      console.error("Error setting target:", error);
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }


  return { loading, error, fetchTargetDetails, fetchTargetList, setTarget, targetDetails, targetList };
};

export default useTargetManagement;
