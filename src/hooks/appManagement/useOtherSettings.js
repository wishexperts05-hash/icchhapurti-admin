import { useRecoilState } from "recoil";
import { otherSettingsAtom } from "../../state/appManagement/OtherSettingsState";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

const useOtherSettings = () => {
  const [otherSettings, setOtherSettings] = useRecoilState(otherSettingsAtom);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  // Get Other Settings
  const fetchOtherSettings = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}admin/appManagement/otherSettings`,
      });

      if (res) {
        setOtherSettings(res?.data);
        // toast.success(res?.message || "Settings fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching other settings:", error);
      toast.error("Failed to fetch Other Settings");
    } finally {
      setLoading(false);
    }
  };

  // Update Other Settings
  const updateOtherSettings = async (settingsData) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}admin/appManagement/otherSettings`,
        data: settingsData,
      });

      if (res) {
        setOtherSettings(res?.data);
        toast.success(res?.message || "Settings updated successfully");
        return res;
      }
    } catch (error) {
      console.error("Error updating other settings:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update settings"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset Other Settings
  const resetOtherSettings = () => {
    setOtherSettings(null);
  };

  return {
    loading,
    otherSettings,
    fetchOtherSettings,
    updateOtherSettings,
    resetOtherSettings,
  };
};

export default useOtherSettings;