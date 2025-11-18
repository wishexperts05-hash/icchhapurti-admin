import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import { FaRegEdit } from "react-icons/fa";
import Button from "../../../../components/uiComponent/Button";

export default function SpinRewardManagementList({ activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  };

  const handleAddReward = () => {
    navigate("/spin-reward-management/add-spin-reward");
  };

  const handleSetSpinPrice = () => {
    navigate("/spin-reward-management/set-spin-price");
  };

  const [rewards, setRewards] = useState([
    {
      srNo: 1,
      rewardTitle: "Buy One Get One Pen Free",
      rewardGet: "Pen",
    },
    {
      srNo: 2,
      rewardTitle: "Batter Luck Next Time",
      rewardGet: "NA",
    },
    {
      srNo: 3,
      rewardTitle: "Get Free Talk With Astrologer",
      rewardGet: "Free Talk",
    },
    {
      srNo: 4,
      rewardTitle: "Flat 15% Off On Next Purchase",
      rewardGet: "15% Off",
    },
    {
      srNo: 5,
      rewardTitle: "Batter Luck Next Time",
      rewardGet: "NA",
    },
    {
      srNo: 6,
      rewardTitle: "Grab One More Ticket",
      rewardGet: "Pen",
    },
    {
      srNo: 7,
      rewardTitle: "Flat 50% Off On Next Purchase",
      rewardGet: "50% Off",
    },
    {
      srNo: 8,
      rewardTitle: "Flat 5% Off On First Purchase",
      rewardGet: "5% Off",
    },
    ...Array.from({ length: 22 }, (_, i) => ({
      srNo: i + 9,
      rewardTitle: `Reward ${i + 9}`,
      rewardGet: i % 3 === 0 ? "Pen" : i % 3 === 1 ? "NA" : `${(i % 5) + 5}% Off`,
    })),
  ]);

  // Filter logic
  const filteredData = useMemo(
    () =>
      rewards.filter(
        (item) =>
          item.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.rewardGet.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [rewards, searchTerm]
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleEdit = (reward) => {
    // FIXED: Added leading slash to make it an absolute path
    navigate(`/spin-reward-management/edit-spin-reward`, {
      state: { reward } // Optional: pass reward data to edit page
    });
  };

  const handleDelete = (reward) => {
    
    // Add delete logic here
    if (window.confirm(`Are you sure you want to delete "${reward.rewardTitle}"?`)) {
      setRewards((prev) => prev.filter((item) => item.srNo !== reward.srNo));
      alert("Reward deleted successfully!");
    }
  };

  // Columns for DataTable
  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "Reward Title", field: "rewardTitle" },
    { header: "Reward Get", field: "rewardGet" },
    { header: "Action", field: "action" },
  ];

  // Actions for DataTable
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

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={currentItems.map((item, index) => ({
            ...item,
            srNo: startIndex + index + 1,
          }))}
          actions={actions}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}