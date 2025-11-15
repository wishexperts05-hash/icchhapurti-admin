import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../components/uiComponent/Pagination";
import useManageRedeemRequest from "../../../hooks/ManageRedeemRequest/useManageRedeemRequest";

const ManageRedeemRequest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("user");
  const {
    loading,
    fetchRedeemRequests,
    redeemRequests,
    fetchDropdownOfStatus,
    dropdownOfStatus,
  } = useManageRedeemRequest();
  console.log(dropdownOfStatus);

  const roleList = dropdownOfStatus ? dropdownOfStatus : [];

  useEffect(() => {
    fetchRedeemRequests(page, limit, search, status);
    fetchDropdownOfStatus(role);
  }, [page, limit, search, status]);

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
    setPage(1);
  };

  const onChangeSelectFunc = (option) => {
    setStatus(option ? option.value : "");
    setPage(1);
  };

  const columns = [
    { header: "name", field: "name" },
    { header: "role", field: "role" },
    { header: "Bank Account No", field: "bankAccount" },
    { header: "wallet Balance", field: "walletBalance" },
    { header: "Redeem Request Amount", field: "redeemRequestAmount" },
    { header: "status", field: "status" },
    { header: "Action", field: "action" },
  ];

  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Manage Redeem Request" }]} />
      <PagePath2
        title="Manage Redeem Request"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showSelect
        options={roleList}
        optionsLoading={loading}
        onChangeSelectFunc={onChangeSelectFunc}
      />
      <Box>
        <DataTable
          columns={columns}
          data={redeemRequests?.data}
          currentPage={1}
          usersPerPage={5}
          actions={[
            {
              icon: <FiEye className="w-5 h-5 text-[#CCA547]" />,
              title: "View",
              onClick: (row) => {
                navigate(
                  `/manage-redeem-request/view-redeem-request/${row._id}`
                );
              },
              className: "hover:bg-blue-100 hover:text-[#004AAD]",
            },
          ]}
        />
      </Box>
      <Pagination
        currentPage={redeemRequests?.pagination?.currentPage}
        totalPages={redeemRequests?.pagination?.totalPages}
        totalItems={redeemRequests?.pagination?.totalItems}
        itemsPerPage={redeemRequests?.pagination?.limit}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Box>
  );
};

export default ManageRedeemRequest;
