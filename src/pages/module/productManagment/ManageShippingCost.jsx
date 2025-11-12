import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaEdit } from "react-icons/fa";

const ManageShippingCost = () => {
  const navigate = useNavigate();

  // 🔹 Tabs
  const [activeTab, setActiveTab] = useState("domestic");

  // 🔹 Domestic Data
  const domesticData = [
    { id: 1, region: "North", cost: "₹ 10" },
    { id: 2, region: "South", cost: "₹ 10" },
    { id: 3, region: "Center", cost: "₹ 10" },
    { id: 4, region: "East", cost: "₹ 10" },
    { id: 5, region: "West", cost: "₹ 10" },
  ];

  // 🔹 International Data
  const internationalData = [
    { id: 1, region: "Asia", cost: "₹ 50" },
    { id: 2, region: "Europe", cost: "₹ 80" },
    { id: 3, region: "Africa", cost: "₹ 70" },
    { id: 4, region: "America", cost: "₹ 90" },
    { id: 5, region: "Australia", cost: "₹ 100" },
  ];

  // 🔹 Columns
  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Region Name", field: "region" },
    { header: "Shipping Cost", field: "cost" },
    { header: "Action", field: "action" },
  ];

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tableData = activeTab === "domestic" ? domesticData : internationalData;
  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔹 Actions
  const handleEdit = (row) => {
    navigate("/product-management/shipping-cost/edit-shipping-cost");
  };

  const actions = [
    {
      icon: <FaEdit className="text-green-600" />,
      title: "Edit",
      onClick: handleEdit,
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Product Managment", href: "/product-management" },
          { text: "Manage Shipping Cost", href: "/product-management/shipping-cost" },
        ]}
      />

      {/* Page Header */}
      <PagePath2 title="Manage Shipping Cost" 
      showSearch
      // selectPlaceHolder = "Select Status"
       showAddButton
       showSelect
       options={["Pen", "Book", "Bag"]}
       selectPlaceHolder = "Select Product Type"
       addButtonText="Add Shipping Cost"
        onClick={() => navigate("/product-management/shipping-cost/add-shipping-cost")}
       
       />

      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-300 mt-4">
        <button
          onClick={() => setActiveTab("domestic")}
          className={`px-6 py-2 font-semibold w-full ${
            activeTab === "domestic"
              ? "border-b-4  border-red-700 text-red-700"
              : "text-yellow-600"
          }`}
        >
          Domestic
        </button>
        <button
          onClick={() => setActiveTab("international")}
          className={`px-6 py-2 font-semibold w-full ${
            activeTab === "international"
              ? "border-b-4 border-red-700 text-red-700"
              : "text-yellow-600"
          }`}
        >
          International
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={tableData}
          actions={actions}
          usersPerPage={itemsPerPage}
          currentPage={currentPage}
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
};

export default ManageShippingCost;
