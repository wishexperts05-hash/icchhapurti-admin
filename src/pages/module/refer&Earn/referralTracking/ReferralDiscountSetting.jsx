import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditReferralTracking from "./EditReferralTracking.jsx";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn.js";

const ReferralDiscountSetting = () => {
   const {fetchRefferalDisSetting, loading, refferalDisSetting, fetchRefferalDisSettingById, refferalDisSettingById,
      updateRefferalDisSetting, resetRefferalDisSettingById
   } = useReferAndEarn();
   const [openPopup, setOpenPopup] = useState(false);

   useEffect(() => {
      fetchRefferalDisSetting();
   }, []);

   console.log("refferalDisSetting:", refferalDisSetting);
   console.log("refferalDisSettingById:", refferalDisSettingById);

   const columns = [
      { header: "Sr.No", field: "srNo" },
      { header: "Referral Type", field: "referralType" },
      { header: "Discount", field: "discount" },
      { header: "Action", field: "action" },
   ];

   const actions = [
      {
         icon: <FaEdit className="text-yellow-500" />,
         title: "Edit",
         onClick: (row) => {
            // fetch specific setting for editing and open popup
            fetchRefferalDisSettingById(row._id);
            setOpenPopup(true);
         },
      }
   ];

   return (
      <Box>
         <BreadCrumb linkText={
            [{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn-user" }, { text: "Referral Discount Setting" }]} />
         <PagePath2  title="Referral Discount Setting" />
         <div>
            {openPopup && (
               <EditReferralTracking onClose={() => setOpenPopup(false)} />
            )}
         </div>
         {(
            <>
               <Box>
                  <DataTable
                     columns={columns}
                     data={refferalDisSetting?.data || []}
                     actions={actions}
                     // currentPage={page}
                     // usersPerPage={limit}
                  />
               </Box>
            </>
         )}
      </Box>
   )
}

export default ReferralDiscountSetting;