import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { FaEdit } from "react-icons/fa";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useProductManagement from "../../../hooks/productList/useProductManagment";

const ManageShippingCost = () => {
  const navigate = useNavigate();
  const { fetchAllDomesticShippingRates, fetchAllInternationalShippingRates, loading } = useProductManagement();

  const [activeTab, setActiveTab] = useState("domestic");
  const [shippingData, setShippingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const columns = [
    { header: "Sr.No", field: "srNo" },
      { header: activeTab === "domestic" ? "Region Name" : "Country", field: "region" },
    { header: "Shipping Cost", field: "cost" },
    { header: "Action", field: "action" },
  ];

  // 🔹 Fetch data based on tab
  const fetchShippingData = async () => {
    try {
      let data = null;

      if (activeTab === "domestic") {
        data = await fetchAllDomesticShippingRates();
      } else {
        data = await fetchAllInternationalShippingRates();
      }

      if (data && data.items) {
        const tableFormattedData = data.items.map((item, index) => ({
          srNo: index + 1,
          region: item.region ||item.country,
          cost: `₹ ${item.shippingCost}`,
          id: item._id,
        }));
        setShippingData(tableFormattedData);
        setTotalItems(data.total);
      }
    } catch (error) {
      console.error("Error fetching shipping data:", error);
    }
  };

  useEffect(() => {
    fetchShippingData();
  }, [activeTab]);

  const handleEdit = (row) => {
    if (activeTab =="domestic")
    navigate(`/product-management/shipping-cost/edit-shipping-cost/domestic/${row.id}`);
     else{
      navigate(`/product-management/shipping-cost/edit-shipping-cost/international/${row.id}`);
     }
  };

  const actions = [
    {
      icon: <FaEdit className="text-green-600" />,
      title: "Edit",
      onClick: handleEdit,
    },
  ];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "Manage Shipping Cost", href: "/product-management/shipping-cost" },
        ]}
      />

      <PagePath2
        title="Manage Shipping Cost"
        showSearch
        showAddButton
        showSelect
        options={["Pen", "Book", "Bag"]}
        selectPlaceHolder="Select Product Type"
        addButtonText="Add Shipping Cost"
        // onClick={() => navigate("/product-management/shipping-cost/add-shipping-cost/domestic")}
        onClick={() => {
        if (activeTab === "domestic") {
            navigate("/product-management/shipping-cost/add-shipping-cost/domestic");
            } else {
             navigate("/product-management/shipping-cost/add-shipping-cost/international");
            }
            }}

      />

      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-300 mt-4">
        <button
          onClick={() => setActiveTab("domestic")}
          className={`px-6 py-2 font-semibold w-full ${
            activeTab === "domestic"
              ? "border-b-4 border-red-700 text-red-700"
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
            {loading ? (
                <div className="w-full flex items-center justify-center">
                  <LoaderSpinner />
                </div>
              ) : (
        <DataTable
          columns={columns}
          data={shippingData}
          actions={actions}
          usersPerPage={itemsPerPage}
          currentPage={currentPage}
          loading={loading}
        />
              )}
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
