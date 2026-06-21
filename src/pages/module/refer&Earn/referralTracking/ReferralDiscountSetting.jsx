import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useEffect, useState } from "react";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import EditReferralTracking from "./EditReferralTracking.jsx";
import AddReferralDiscountSetting from "./AddReferralDiscountSetting.jsx";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn.js";

const ReferralDiscountSetting = () => {
   const {
      fetchRefferalDisSetting,
      loading,
      refferalDisSetting,
      fetchRefferalDisSettingById,
      refferalDisSettingById,
      updateRefferalStatus,
   } = useReferAndEarn();
   const [openPopup, setOpenPopup] = useState(false);
   const [openAddPopup, setOpenAddPopup] = useState(false);

   useEffect(() => {
      fetchRefferalDisSetting();
   }, []);

   console.log("refferalDisSetting:", refferalDisSetting);
   console.log("refferalDisSettingById:", refferalDisSettingById);

   const columns = [
      { header: "Sr.No", field: "srNo" },
      { header: "Referral Type", field: "referralType" },
      { header: "Referrer Coins", field: "ReferrerCoins" },
      { header: "Referee Coins", field: "RefereeCoins" },
      { header: "Status", field: "isActive" },
      { header: "Action", field: "action" },
   ];

   const handleStatusToggle = async (row) => {
      const newStatus = !row.isActive;
      await updateRefferalStatus(row.referralType, newStatus);
      fetchRefferalDisSetting();
   };

   const actions = [
      {
         icon: <FaEdit className="text-yellow-500 w-5 h-5" />,
         title: "Edit",
         onClick: (row) => {
            // fetch specific setting for editing and open popup
            fetchRefferalDisSettingById(row._id);
            setOpenPopup(true);
         },
      },
      {
         icon: (row) => row.isActive ? (
            <FaToggleOn className="text-green-500 w-6 h-6 cursor-pointer" />
         ) : (
            <FaToggleOff className="text-red-500 w-6 h-6 cursor-pointer" />
         ),
         title: "Toggle Status",
         onClick: (row) => handleStatusToggle(row),
      }
   ];

   return (
      <Box>
         <BreadCrumb linkText={
            [{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn-user" }, { text: "Referral Discount Setting" }]} />
         <PagePath2
            title="Referral Discount Setting"
            showAddButton={true}
            addButtonText="Add Referral Discount Setting"
            onClick={() => setOpenAddPopup(true)}
         />
         <div>
            {openPopup && (
               <EditReferralTracking onClose={() => setOpenPopup(false)} />
            )}
            {openAddPopup && (
               <AddReferralDiscountSetting onClose={() => setOpenAddPopup(false)} />
            )}
         </div>
         <Box>
            <DataTable
               columns={columns}
               data={refferalDisSetting?.data || []}
               actions={actions}
               onToggleStatus={handleStatusToggle}
            />
         </Box>
      </Box>
   );
};

export default ReferralDiscountSetting;