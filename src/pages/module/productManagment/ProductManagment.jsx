import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import BreadCrumb from '../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../components/uiComponent/PagePath2';
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import TrashBin from '../../../assets/trashBin.png';
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

import useProductManagement from "../../../hooks/productList/useProductManagment";


const ProductManagment = () => {

  const navigate = useNavigate();

    const { fetchProductList, productList,loading } =
    useProductManagement();

      const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
 

    useEffect(() => {
    fetchProductList(page, limit, searchQuery);
  }, [page, limit,searchQuery]);

   const setCurrentPage = (data) => {
    setPage(data);
  }


    const columns = [
    { header: "Sr.No", field: "srNo" },
        { 
    header: "Images", 
    field: "images",
    render: (row) => {
      const firstImage = row.images?.[0];
      const extraCount = row.images?.length > 1 ? row.images.length - 1 : 0;

      return (
        <div className="relative w-12 h-12">
          {firstImage && (
            <img 
              src={firstImage.url} 
              alt={row.name} 
              className="w-12 h-12 object-cover rounded"
            />
          )}
          {extraCount > 0 && (
            <div className="absolute top-0 left-0 w-12 h-12 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs rounded">
              +{extraCount}
            </div>
          )}
        </div>
      );
    },
  },
    { header: "Product Category", field: "category" },
    { header: "Product Name", field: "name" },

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
        searchTerm={searchQuery}
        handleSearchTerm={(e) => setSearchQuery(e.target.value)}
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
     {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
      <div className="mt-6 bg-white p-4 rounded shadow">
        <DataTable
          columns={columns}
          data={productList?.products || []}
          actions={actions}
          usersPerPage={10}
          currentPage={1}
        />
      

         {/* Pagination */}
      <Pagination
        currentPage={productList?.currentPage}
        totalPages={productList?.totalPages || 1}
        totalItems={productList?.totalProducts}
        itemsPerPage={productList?.perPage}
        onPageChange={setCurrentPage}
        // onItemsPerPageChange={setItemsPerPage}
      />
      </div>
)}
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
            <div className= "flex justify-center text-green-500 text-6xl mb-2">
              <img src={TrashBin} alt="TrashBin" />
            </div>
            <p className="font-semibold text-lg">Product Deleted Successfully</p>
          {/* </motion.div> */}
          </div>
        </div>
      )}
    </div>
  )
  
}

export default ProductManagment