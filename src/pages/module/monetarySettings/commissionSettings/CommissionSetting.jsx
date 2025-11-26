import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import Pagination from "../../../../components/uiComponent/Pagination";
import useManageRedeemRequest from "../../../../hooks/ManageRedeemRequest/useManageRedeemRequest";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import { Trash2 } from "lucide-react";
import useCommissionSetting from "../../../../hooks/monetarySettings/useCommissionSetting";
import { use } from "react";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const CommissionSetting = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { fetchCommissionSettingsList, loading, commissionSettingList } = useCommissionSetting();
  const debouncedSearch = useDebounce(search, 500);
  const [userType, setUserType] = useState("");
  const [salesType, setSalesType] = useState("");

  const {
    loading: redeemRequestLoading,
    fetchRedeemRequests,
    redeemRequests,
    fetchDropdownOfStatus,
    dropdownOfStatus,
  } = useManageRedeemRequest();

  useEffect(() => {
    fetchCommissionSettingsList(page, limit, debouncedSearch, userType, salesType);
  }, [page, limit, debouncedSearch, userType, salesType]);

  console.log("commissionSettingList", commissionSettingList);

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
    setSalesType(option ? option.value : "");
    setPage(1);
  };

  const onChangeUserRole = (option) => {
    setUserType(option ? option.value : "");
    setPage(1);
  };

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Sales Type", field: "salesType" },
    { header: "User Type", field: "userType" },
    { header: "Product Name", field: "productName" },
    { header: "Product Quantity", field: "productQuantity" },
    { header: "Commission", field: "commissionIn" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      //  onClick: handleView,
      title: "View",
    },
    {
      icon: (row) => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      //  onClick: handleEdit,
      title: "Edit",
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      //  onClick: handleDelete,
      title: "Delete",
    },
  ];

  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Monetary Settings" }, { text: "Commission Settings" }]} />
      <PagePath2
        title="Commission Settings"
        // ShowSearch
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        // Show Select type
        showSelect
        options={["Direct Sale", "Indirect Sale"]}
        optionsLoading={loading}
        onChangeSelectFunc={onChangeSelectFunc}
        selectPlaceHolder="Sales Type"
        // Second Select (User Role)
        showSecondSelect
        secondSelectOptions={["User", "Staff", "Promoter"]}
        secondSelectPlaceholder="User Type"
        secondSelectLoading={loading}
        onChangeSecondSelect={onChangeUserRole}
        // ShowAddButton
        showAddButton
        addButtonText="Set Commission"
        onClick={() => navigate("/monetary-settings/commission-settings/add-commission")}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoaderSpinner />
        </Box>
      ) : (
        <>
          <Box>
            <DataTable
              columns={columns}
              data={commissionSettingList?.data}
              currentPage={page}
              usersPerPage={limit}
              actions={actions}
            />
          </Box>
          <Pagination
            currentPage={commissionSettingList?.pagination?.currentPage}
            totalPages={commissionSettingList?.pagination?.totalPages}
            totalItems={commissionSettingList?.pagination?.totalItems}
            itemsPerPage={commissionSettingList?.pagination?.limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </>
      )}
    </Box>
  )
}

export default CommissionSetting
