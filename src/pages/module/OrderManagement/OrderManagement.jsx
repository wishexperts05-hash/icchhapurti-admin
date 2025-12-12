import React, { useEffect, useState } from "react";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import { Box } from "@mui/material";
import DataTable from "../../../components/uiComponent/DataTable";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/uiComponent/Pagination";
import useDebounce from "../../../hooks/debounce/useDebounce";
import useOrderManagement from "../../../hooks/orderManagement/useOrderManagement";
import useDropdown from "../../../hooks/dropdown/useDropdown";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useLogin from "../../../hooks/auth/useLogin";
import usePermissions from "../../../hooks/auth/usePermissions";

const OrderManagement = () => {
  const { loading, orderList, fetchOrderList, } = useOrderManagement();
  const { fetchOrderStatus, orderStatus, fetchUserType, userType: userTypeOptions, loadingUser, loadingOrderStatus } = useDropdown();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [userType, setUserType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { subAdminAccess } = useLogin();
  const { canRead } = usePermissions(
    subAdminAccess,
    "Order Management"
  );

  useEffect(() => {
    fetchOrderList(page, limit, debouncedSearch, status, userType, startDate, endDate);
  }, [page, limit, debouncedSearch, status, userType, startDate, endDate]);

  useEffect(() => {
    fetchUserType();
    fetchOrderStatus();
  }, []);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "User Name", field: "userName" },
    { header: "Order Id", field: "orderId" },
    { header: "User Type", field: "userType" },
    { header: "Total Amount", field: "totalAmount" },
    { header: "Order Date", field: "orderDate" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  const handleView = (row) => {
    navigate(`/order-management/order-details/${row?.userType}/${row?.orderId}`);
  }

  const actions = [
    {
      icon: (row) => (
        <FiEye
          className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
          title="View"
        />
      ),
      onClick: handleView,
      title: "View",
      disableCondition: () => !canRead,
    },
  ];

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    setPage(1);
  };

  const onChangeSelectFunc = (option) => {
    const selected = option ? option.value : "";
    setUserType(selected);
    setPage(1);
  };

  const onChangeOrderStatus = (option) => {
    const selected = option ? option.value : "";
    setStatus(selected);
    setPage(1);
  }
  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
    setPage(1);
  };

  const onEndDateChange = (e) => {
    setEndDate(e.target.value);
    setPage(1);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb linkText={[{ text: "Order Management" }]} />
      <PagePath2 title="Order Management"
        // ShowSearch
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        // Date range filters
        showDateRange
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        // Show User type
        showSelect
        options={userTypeOptions}
        optionsLoading={loadingUser}
        onChangeSelectFunc={onChangeSelectFunc}
        selectPlaceHolder="User Type"
        // Show Order Status
        showSecondSelect
        secondSelectOptions={orderStatus}
        secondSelectPlaceholder="Order Status"
        secondSelectLoading={loadingOrderStatus}
        onChangeSecondSelect={onChangeOrderStatus}
      />
      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={orderList?.data}
            currentPage={page}
            usersPerPage={limit}
            actions={actions}
          />
          <Pagination
            currentPage={orderList?.pagination?.currentPage}
            totalPages={orderList?.pagination?.totalPages}
            totalItems={orderList?.pagination?.totalRecords}
            itemsPerPage={orderList?.pagination?.limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
