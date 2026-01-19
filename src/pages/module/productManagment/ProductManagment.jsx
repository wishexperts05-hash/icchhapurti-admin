import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BreadCrumb from '../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../components/uiComponent/PagePath2';
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaEye, FaEdit } from "react-icons/fa";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import useDebounce from '../../../hooks/debounce/useDebounce';
import useLogin from '../../../hooks/auth/useLogin';
import usePermissions from '../../../hooks/auth/usePermissions';
import { Trash2 } from 'lucide-react';

const ProductManagment = () => {
  const navigate = useNavigate();
  const { fetchProductList, productList, loading, deleteProductListID } = useProductManagement();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Product Management"
  );

  useEffect(() => {
    fetchProductList(page, limit, debouncedSearch);
  }, [page, limit, debouncedSearch]);

  const setCurrentPage = (data) => {
    setPage(data);
  }

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchQuery(newSearchTerm);
    setPage(1);
  };

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
                src={firstImage}
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

    // { header: "Price", field: "price" },
    { header: "Action", field: "action" },
  ];

  const handleDelete = async (id) => {
    await deleteProductListID(id);
    fetchProductList(page, limit, status);
  };

  const actions = [
    {
      icon: <FaEye className="text-yellow-600" />,
      title: "View",
      onClick: (row) => navigate(`/product-management/product-view/${row._id}`),
      disableCondition: () => !canRead,
    },
    {
      icon: <FaEdit className="w-5 h-5 text-yellow-600 hover:text-green-600 transition-colors duration-200 cursor-pointer" />,
      title: "Edit",
      onClick: (row) => navigate(`/product-management/product-edit/${row._id}`),
      disableCondition: () => !canUpdate,
    },
    {
      icon: <Trash2 className="w-5 h-5 text-red-600 hover:text-red-600 transition-colors duration-200 cursor-pointer" />,
      title: "Delete",
      onClick: (row) => handleDelete(row?._id),
      disableCondition: () => !canDelete,
    },
  ];

  const handleAddProduct = () => {
    navigate("/product-management/add-product");
  }

  const handleShippingCost = () => {
    navigate("/product-management/shipping-cost")
  }

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
        handleSearchTerm={onSearchChange}
        showAddButton
        showExtraButton
        extraButtonText="Manage Shipping Cost"
        addButtonText="Add Product"
        onClick={canCreate ? handleAddProduct : undefined}
        canCreate={canCreate}
        onExtraClick={canCreate ? handleShippingCost : undefined}
      />

      {/* DataTable */}
      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
          <DataTable
  columns={columns}
  data={productList?.products?.map((product, index) => ({
    ...product,
    srNo: (page - 1) * limit + index + 1
  })) || []}
  currentPage={productList?.currentPage}
  usersPerPage={limit}
  actions={actions.map((action) => ({
    ...action,
    label:
      typeof action.label === "function"
        ? undefined
        : action.label,
    onClick: action.onClick,
  }))}
/>

          <Pagination
            currentPage={productList?.currentPage}
            totalPages={productList?.totalPages || 1}
            totalItems={productList?.totalProducts}
            itemsPerPage={productList?.perPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  )

}

export default ProductManagment