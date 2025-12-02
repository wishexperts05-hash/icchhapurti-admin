import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import PagePath2 from "../../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../../../hooks/debounce/useDebounce";
import Pagination from "../../../../../components/uiComponent/Pagination";
import { FaEye } from "react-icons/fa";
import BreadCrumb from "../../../../../components/uiComponent/BreadCrumb";

const ReferralTrackingForStaff = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Static dummy data
  const referrelData = [
    {
      srNo: 1,
      userName: "Rahul Sharma",
      totalCoinEarned: 1200,
      action: "View",
    },
    {
      srNo: 2,
      userName: "Priya Verma",
      totalCoinEarned: 980,
      action: "View",
    },
    {
      srNo: 3,
      userName: "Amit Patil",
      totalCoinEarned: 1500,
      action: "View",
    },
    {
      srNo: 4,
      userName: "Sneha Kulkarni",
      totalCoinEarned: 760,
      action: "View",
    },
    {
      srNo: 5,
      userName: "Karan Gupta",
      totalCoinEarned: 1870,
      action: "View",
    },
    {
      srNo: 6,
      userName: "Meera Yadav",
      totalCoinEarned: 640,
      action: "View",
    },
    {
      srNo: 7,
      userName: "Sanjay Singh",
      totalCoinEarned: 1340,
    }
  ];

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

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "User Name", field: "userName" },
    { header: "Total Coin Earned", field: "totalCoinEarned" },
    { header: "Action", field: "action" },
  ];
  // View Table
  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: ()=>navigate("/refer-and-earn-user/view-user-referral"),
    },];
  
  
 // handle select
  const handleSelect = (value) => {
    if (value === "User") console.log("Hii");
    ;
   
  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Referral Tracking" }]} />
      <PagePath2
        title="Referral Tracking"
        // ShowSearch
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        // Show Select type
        showSelect
        selectPlaceHolder="User"
        options={["Select","User", "Staff"]}
        onChange={handleSelect}


        // ShowAddButton
        showAddButton
        addButtonText="Referral Discount Settings"
        onClick={() => navigate("/refer-and-earn-user/referral-discount-setting")}

      />
      {(
        <>
          <Box>
            <DataTable
              columns={columns}
              data={referrelData}
              actions={actions}
              currentPage={page}
              usersPerPage={limit}

            />
          </Box>

          <Pagination
            currentPage={1}
            totalPages={5}
            totalItems={11}
            itemsPerPage={8}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />

        </>
      )}
    </Box>
  )
}
}
export default ReferralTrackingForStaff;


