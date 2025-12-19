import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";

import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";

export default function SpinRewardManagementList() {
  const navigate = useNavigate();
  const { loading, spinRewardList, fetchSpinRewardList, deleteSpinReward } =
    useSpinRewardManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);
    const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Spin Reward Management"
  );

  console.log("spinRewardList", spinRewardList);
  useEffect(() => {
    fetchSpinRewardList(page, limit, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedSearch]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleAddReward = () => {
    navigate("/spin-reward-management/add-spin-reward");
  };

  const handleSetSpinPrice = () => {
    navigate("/spin-reward-management/set-spin-price");
  };

  const handleEdit = (reward) => {
    navigate(`/spin-reward-management/edit-spin-reward/${reward._id}`);
  };

  const handleDelete = async (id) => {
    await deleteSpinReward(id);
     fetchSpinRewardList(page, limit, debouncedSearch);
  };

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Reward Title", field: "title" },
    { header: "Reward Get", field: "rewardType" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: () => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
      disableCondition: () => !canUpdate,
    },
    {
      icon: () => (
        <Trash2
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Delete"
        />
      ),
      onClick: (row) => handleDelete(row?._id),
      disableCondition: () => !canDelete,
    },
  ];

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb linkText={[{ text: "Spin Reward Management" }]} />

      <PagePath2
        title="Spin Reward Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Set Spin Price"
        onClick={canCreate ? handleSetSpinPrice : undefined}
        showExtraButton={true}
        extraButtonText="Add New Reward"
        onExtraClick={canCreate ? handleAddReward : undefined}
        canCreate={canCreate}
      />

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
         <DataTable
  columns={columns}
  data={spinRewardList?.data || []}
  currentPage={page}
  usersPerPage={limit}
  actions={actions}
/>


          <Pagination
            currentPage={page}
            totalPages={spinRewardList?.pagination?.totalPages}
            totalItems={spinRewardList?.pagination?.totalRecords}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}
