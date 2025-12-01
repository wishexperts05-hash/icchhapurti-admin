import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { href, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import { FaEdit, FaEye } from "react-icons/fa";

const ReferralDiscountSetting = () => {
   const navigate = useNavigate();
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [search, setSearch] = useState("");
   const debouncedSearch = useDebounce(search, 500);
   // Static dummy data
   const dummyData = [
      { srNo: 1, userName: "Direct Referral", totalCoinEarned: "10%", action: "Edit" },
      { srNo: 2, userName: "Indirect Referral", totalCoinEarned: "5%", action: "Edit" },
      { srNo: 3, userName: "Premium Referral", totalCoinEarned: "15%", action: "Edit" },
      { srNo: 4, userName: "Student Referral", totalCoinEarned: "8%", action: "Edit" },
      { srNo: 5, userName: "Affiliate Referral", totalCoinEarned: "12%", action: "Edit" },
      { srNo: 6, userName: "Partner Referral", totalCoinEarned: "7%", action: "Edit" },
      { srNo: 7, userName: "Gold Referral", totalCoinEarned: "20%", action: "Edit" },
      { srNo: 8, userName: "Silver Referral", totalCoinEarned: "14%", action: "Edit" },
      { srNo: 9, userName: "Bronze Referral", totalCoinEarned: "6%", action: "Edit" },
      { srNo: 10, userName: "Special Referral", totalCoinEarned: "18%", action: "Edit" }
   ];

   // event functions

   const onPageChange = (newPage) => {
      setPage(newPage);
   };

   const onItemsPerPageChange = (newLimit) => {
      setLimit(newLimit);
      setPage(1);
   };

   const onSearchChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearch(newSearchTerm);

   };
   // fields in the columns
   const columns = [
      { header: "Sr.No", field: "srNo" },
      { header: "Referral Type", field: "userName" },
      { header: "Discount", field: "totalCoinEarned" },
      { header: "Action", field: "action" },
   ];

   // edit Table
   const actions = [
      {
         icon: <FaEdit className="text-green-600" />,
         title: "Edit",
         onClick: (row) => navigate(""),
      }
   ];
   return (
      <Box>
         <BreadCrumb linkText={
            [{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn" }, { text: "Referral Discount Setting" }]} />
         <PagePath2
            title="Referral Tracking"
         />
         {(
            <>
               <Box>
                  <DataTable
                     columns={columns}
                     data={dummyData}
                     actions={actions}
                     currentPage={page}
                     usersPerPage={limit}

                  />
               </Box>

               <Pagination
                  currentPage={1}
                  totalPages={5}
                  totalItems={11}
                  itemsPerPage={10}
                  onPageChange={onPageChange}
                  onItemsPerPageChange={onItemsPerPageChange}
               />

            </>
         )}
      </Box>
   )
}

export default ReferralDiscountSetting;