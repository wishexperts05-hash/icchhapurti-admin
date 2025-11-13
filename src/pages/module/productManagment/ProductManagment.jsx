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

    const { fetchProductList, productList,loading,deleteProductListID  } =
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



    const handleDelete = async (id) => {
    await deleteProductListID(id);
    fetchProductList(page, limit,  status);
  };

// const confirmDelete = async (id) => {
//   if (!selectedProduct) return;

//   setShowConfirmModal(false);
//   try {
//     await deleteProductListID(id); // call API
//     // Refresh the list after deletion
//     fetchProductList(page, limit, searchQuery);
//   } catch (err) {
//     console.error("Delete failed:", err);
//   } finally {
//     setSelectedProduct(null);
//   }
// };



  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: (row) => navigate(`/product-management/product-view${row._id}`),
    },
    {
      icon: <FaEdit className="text-green-600" />,
      title: "Edit",
      onClick: (row) => navigate(`/product-management/product-edit${row._id}`),
    },
    {
      icon: <FaTrash className="text-red-600" />,
      title: "Delete",
      onClick: (row) => handleDelete(row?._id),

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
      
  
    </div>
  )
  
}

export default ProductManagment