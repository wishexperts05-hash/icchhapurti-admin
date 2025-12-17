import { useRecoilState } from "recoil";
import { helpSupportAtom } from "../../state/appManagement/HelpAndSupportState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useHelpSupport = () => {
  const [helpSupportNumber, setHelpSupportNumber] = useRecoilState(helpSupportAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  const getHelpSupportContact = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/appManagement/helpSupport`,
      });
      if (res) {
        setHelpSupportNumber(res.data);
        setLoading(false);
        return res;
      }
    } catch (error) {
      console.error("Error fetching help & support contact:", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateHelpSupportContact = async (contactNumber) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/appManagement/helpSupport`,
        data: {
          contactNumber: contactNumber,
        },
      });

      if (res) {
        toast.success(res?.message);
        setHelpSupportNumber(res.data);
        setLoading(false);
        return res;
      }
    } catch (error) {
      console.error("Error updating help & support contact:", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetHelpSupportState = () => {
    setHelpSupportNumber(null)
  };

  return {
    loading,
    helpSupportNumber,
    getHelpSupportContact,
    updateHelpSupportContact,
    resetHelpSupportState,
  };
};

export default useHelpSupport;