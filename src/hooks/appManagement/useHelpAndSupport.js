import { useRecoilState } from "recoil";
import { helpSupportAtom } from "../../state/appManagement/HelpAndSupportState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";

const useHelpSupport = () => {
  const [helpSupportState, setHelpSupportState] = useRecoilState(helpSupportAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // Get Help & Support Contact Number
  const getHelpSupportContact = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/appManagement/helpSupport`,
      });

      if (res && res.success) {
        setHelpSupportState({
          contactNumber: res.data,
          loading: false,
          error: null,
        });
        return res;
      }
    } catch (error) {
      console.error("Error fetching help & support contact:", error);
      toast.error("Failed to fetch Help & Support Contact Number");
      setHelpSupportState((prev) => ({
        ...prev,
        loading: false,
        error: error?.response?.data?.message || "An unexpected error occurred",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Update Help & Support Contact Number
  const updateHelpSupportContact = async (contactNumber) => {
    const result = await confirmAlert(
      "Do you want to update the Help & Support contact number?"
    );

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "PUT",
          url: `${conf.apiBaseUrl}admin/appManagement/helpSupport`,
          data: {
            contactNumber: contactNumber,
          },
        });

        if (res && res.success) {
          toast.success(res?.message || "Help and Support Number Updated Successfully");
          
          // Update state with new contact number
          setHelpSupportState({
            contactNumber: res.data,
            loading: false,
            error: null,
          });

          Swal.fire({
            title: "Updated!",
            text: res?.message || "Contact number updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });

          return res;
        }
      } catch (error) {
        console.error("Error updating help & support contact:", error);
        toast.error(
          error?.response?.data?.message || "Failed to update contact number"
        );
        setHelpSupportState((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message || "An unexpected error occurred",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  // Reset Help Support State
  const resetHelpSupportState = () => {
    setHelpSupportState({
      contactNumber: null,
      loading: false,
      error: null,
    });
  };

  return {
    loading,
    contactNumber: helpSupportState.contactNumber,
    error: helpSupportState.error,
    getHelpSupportContact,
    updateHelpSupportContact,
    resetHelpSupportState,
  };
};

export default useHelpSupport;