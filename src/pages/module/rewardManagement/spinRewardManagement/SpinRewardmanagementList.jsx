import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";
import Button from "../../../../components/uiComponent/Button";

import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

export default function SpinRewardManagementList() {
  const navigate = useNavigate();

  const { loading, spinRewardList, fetchSpinRewardList } =
    useSpinRewardManagement();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchSpinRewardList();
  }, []);

  const filteredRewards = (spinRewardList || []).filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item?.title?.toLowerCase().includes(q) ||
      item?.rewardType?.toLowerCase().includes(q) ||
      item?.userType?.toLowerCase().includes(q)
    );
  });

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddReward = () => {
    navigate("/spin-reward-management/add-spin-reward");
  };

  const handleSetSpinPrice = () => {
    navigate("/spin-reward-management/set-spin-price");
  };

  const totalItems = filteredRewards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRewards.slice(startIndex, endIndex);

  const handleEdit = (reward) => {
    navigate(`/spin-reward-management/edit-spin-reward`, {
      state: { reward },
    });
  };

  const handleDelete = (reward) => {
    if (
      window.confirm(`Are you sure you want to delete "${reward.rewardTitle}"?`)
    ) {
      setRewards((prev) => prev.filter((item) => item.srNo !== reward.srNo));
      alert("Reward deleted successfully!");
    }
  };

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Reward Title", field: "title" },
    { header: "Reward Get", field: "rewardType" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: (row) => (
        <FaRegEdit
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Edit"
        />
      ),
      onClick: handleEdit,
    },
    {
      icon: (row) => (
        <Trash2
          className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          title="Delete"
        />
      ),
      onClick: handleDelete,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb linkText={[{ text: "Spin Reward Management" }]} />

      {/* Page Title & Search */}
      <PagePath2
        title="Spin Reward Management"
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Set Spin Price"
        onClick={handleSetSpinPrice}
        showExtraButton={true}
        extraButtonText="Add New Reward"
        onExtraClick={handleAddReward}
      />

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <DataTable columns={columns} data={currentItems} actions={actions} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
