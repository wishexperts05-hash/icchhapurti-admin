import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../components/uiComponent/Pagination";
import useManageRedeemRequest from "../../../hooks/ManageRedeemRequest/useManageRedeemRequest";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useLogin from "../../../hooks/auth/useLogin";
import usePermissions from "../../../hooks/auth/usePermissions";
import { FaEye } from "react-icons/fa";
import useDebounce from "../../../hooks/debounce/useDebounce";

const ManageRedeemRequest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { subAdminAccess } = useLogin();
  const { canRead } = usePermissions(
    subAdminAccess,
    "Manage Redeem Request"
  );
  const {
    loading,
    fetchRedeemRequests,
    redeemRequests,
    fetchDropdownOfStatus,
    dropdownOfStatus,
  } = useManageRedeemRequest();

  useEffect(() => {
    fetchRedeemRequests(page, limit, debouncedSearch, status);
    fetchDropdownOfStatus();
  }, [page, limit, debouncedSearch, status]);

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
    const selected = option ? option.value : "";
    setStatus(selected);
    setPage(1);
  };

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Name", field: "name" },
    { header: "Role", field: "role" },
    { header: "Bank Account No", field: "bankAccount" },
    { header: "Wallet Balance", field: "walletBalance" },
    { header: "Redeem Request Amount", field: "redeemRequestAmount" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  const handleView = (row) => {
    navigate(`/manage-redeem-request/view-redeem-request/${row._id}`);
  };

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: handleView,
      disableCondition: () => !canRead,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb linkText={[{ text: "Manage Redeem Request" }]} />
      <PagePath2
        title="Manage Redeem Request"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        placeholder="Search by name"
        // Select
        showSelect
        options={dropdownOfStatus}
        optionsLoading={loading}
        onChangeSelectFunc={onChangeSelectFunc}
      />
      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
            <DataTable
              columns={columns}
              data={redeemRequests?.data}
              currentPage={page}
              usersPerPage={limit}
              actions={actions}
            />
            <Pagination
              currentPage={redeemRequests?.pagination?.currentPage}
              totalPages={redeemRequests?.pagination?.totalPages}
              totalItems={redeemRequests?.pagination?.totalItems}
              itemsPerPage={redeemRequests?.pagination?.limit}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageRedeemRequest;
