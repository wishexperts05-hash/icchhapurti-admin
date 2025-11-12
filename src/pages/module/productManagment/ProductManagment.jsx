import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import BreadCrumb from '../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../components/uiComponent/PagePath2';
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { motion } from "framer-motion";

const ProductManagment = () => {

  const navigate = useNavigate();
     // 🟡 Dummy data
  const productData = [
    {
      id: 1,
      category: "Pen",
      name: "Pilot",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 2,
      category: "Pen",
      name: "Uni-ball",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 3,
      category: "Pen",
      name: "Cello",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 4,
      category: "Pen",
      name: "Reynolds",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 5,
      category: "Pen",
      name: "Pentel",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 6,
      category: "Pen",
      name: "Parker",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 7,
      category: "Pen",
      name: "Waterman",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 8,
      category: "Pen",
      name: "Lamy",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
    {
      id: 9,
      category: "Pen",
      name: "Montblanc",
      description: "Known for their smoothness, reliability, and consistency.",
      price: "₹ 10",
    },
  ];

    const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Product Category", field: "category" },
    { header: "Product Name", field: "name" },
    { header: "Description", field: "description" },
    { header: "Price", field: "price" },
    { header: "Action", field: "action" },
  ];

    // 🔹 Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedProduct(row);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    // simulate delete success
    setTimeout(() => {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }, 500);
  };


  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: () => navigate("/product-management/product-view"),
    },
    {
      icon: <FaEdit className="text-green-600" />,
      title: "Edit",
      onClick: () => navigate("/product-management/product-edit"),
    },
    {
      icon: <FaTrash className="text-red-600" />,
      title: "Delete",
      onClick: handleDeleteClick,

    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = productData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
         {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Product Managment", href: "/productMangment" },  
        ]}
      />
       <PagePath2
        title="Product Managment"
        showSearch
        // searchTerm={search}
        // handleSearchTerm={onSearchChange}
        // showSelect
        // options={statusList}
        // optionsLoading={dropdownLoading}
        // onChangeSelectFunc={onChangeSelectFunc}   
        showAddButton
        showExtraButton
        extraButtonText="Manage Shipping Cost"
        addButtonText="Add Product"
        onClick={() => navigate("/product-management/add-product")}
        onExtraClick={() => navigate("/product-management/shipping-cost")} 
      />

 {/* DataTable */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={productData}
          actions={actions}
          usersPerPage={10}
          currentPage={1}
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

      {/* 🔸 Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50">
          {/* <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md text-center w-80"
          > */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center w-80" >
            <h2 className="text-lg font-semibold mb-4">
              Do you want to delete this product?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="border border-yellow-600 text-yellow-600 px-4 py-1 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-yellow-600 text-white px-4 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
          {/* </motion.div> */}
        </div>
      )}

      {/* 🔸 Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50">
          {/* <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md text-center w-80"
          > */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
            <div className="text-green-500 text-6xl mb-2">🗑️</div>
            <p className="font-semibold text-lg">Product Deleted Successfully</p>
          {/* </motion.div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagment