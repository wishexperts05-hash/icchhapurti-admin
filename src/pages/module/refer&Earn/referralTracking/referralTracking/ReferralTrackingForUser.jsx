import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PagePath2 from "../../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../../../hooks/debounce/useDebounce";
import Pagination from "../../../../../components/uiComponent/Pagination";
import { FaEye } from "react-icons/fa";
import BreadCrumb from "../../../../../components/uiComponent/BreadCrumb";
import useReferAndEarn from "../../../../../hooks/referAndEarn/useReferAndEarn";
import useDropdown from "../../../../../hooks/dropdown/useDropdown";

const ReferralTracking = () => {
  const { loading, referralTracking, fetchReferralTracking } = useReferAndEarn();
  const { fetchUserType, userType: userTypeOptions, loadingUser } = useDropdown();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchReferralTracking(page, limit, debouncedSearch, userType);
  }, [page, limit, debouncedSearch, userType]);

  useEffect(() => {
    fetchUserType();
  }, []);

  console.log("referralTracking:", referralTracking);

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

  const onChangeUserRole = (option) => {
    setUserType(option ? option.value : "");
    setPage(1);
  };

  const handleView = (row) => {
    navigate(`/refer-and-earn-user/view-user-referral/${row._id}`);
  };

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "User Type", field: "userType" },
    { header: "User Name", field: "name" },
    { header: "Total Coin Earned", field: "totalCoinEarned" || "-" },
    { header: "Total Cash Earned", field: "moneyEarned" || "-" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: handleView,
    },];

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
        selectPlaceHolder="Select User Type"
        options={userTypeOptions}
        optionsLoading={loadingUser}
        onChangeSelectFunc={onChangeUserRole}
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
              data={referralTracking?.data || []}
              actions={actions}
              currentPage={page}
              usersPerPage={limit}
            />
          </Box>
          <Pagination
            currentPage={referralTracking?.pagination?.currentPage}
            totalPages={referralTracking?.pagination?.totalPages}
            totalItems={referralTracking?.pagination?.totalRecords}
            itemsPerPage={referralTracking?.pagination?.limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </>
      )}
    </Box>
  )
}

export default ReferralTracking;
