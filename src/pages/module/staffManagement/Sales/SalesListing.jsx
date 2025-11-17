import React, { useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination"; 

const StaffSales = () => {
  // States for Direct Sales
  const [filterOption, setFilterOption] = useState("");
  const [currentPageDirect, setCurrentPageDirect] = useState(1);
  const [itemsPerPageDirect] = useState(5);

  // States for Indirect Sales
  const [filtersOption, setFiltersOption] = useState("");
  const [currentPageIndirect, setCurrentPageIndirect] = useState(1);
  const [itemsPerPageIndirect] = useState(10);

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleFiltersChange = (e) => {
    setFiltersOption(e.target.value);
  };

  const directSalesData = [
    { id: 1, name: "Arlene McCoy", code: "C001", productName: "Pen", directSales: 500, quantity: 50, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 2, name: "Jacob Jones", code: "G001", productName: "Pen", directSales: 500, quantity: 50, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 3, name: "Kristin Watson", code: "F001", productName: "Pen", directSales: 500, quantity: 50, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 4, name: "Jenny Wilson", code: "B001", productName: "Pen", directSales: 500, quantity: 50, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 5, name: "Kristin Watson", code: "F001", productName: "Pen", directSales: 500, quantity: 50, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 6, name: "Devon Lane", code: "Z002", productName: "Pencil", directSales: 700, quantity: 70, referralEarnings: "₹800", totalRevenue: "₹8000" },
  ];

  const indirectSalesData = [
    { id: 1, name: "Arlene McCoy", code: "C001", productName: "Pen", indirectSales: 150, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 2, name: "Jacob Jones", code: "G001", productName: "Pen", indirectSales: 150, referralEarnings: "₹700", totalRevenue: "₹7000" },
    { id: 3, name: "Jenny Wilson", code: "B001", productName: "Pen", indirectSales: 100, referralEarnings: "₹500", totalRevenue: "₹5000" },
  ];

  // Pagination calculations
  const totalPagesDirect = Math.ceil(directSalesData.length / itemsPerPageDirect);
  const totalPagesIndirect = Math.ceil(indirectSalesData.length / itemsPerPageIndirect);

  const currentDirect = directSalesData.slice(
    (currentPageDirect - 1) * itemsPerPageDirect,
    currentPageDirect * itemsPerPageDirect
  );

  const currentIndirect = indirectSalesData.slice(
    (currentPageIndirect - 1) * itemsPerPageIndirect,
    currentPageIndirect * itemsPerPageIndirect
  );

  const directColumns = [
    { header: "Sr No.", field: "id" },
    {
      header: "Staff Name",
      field: "name",
      render: (row) => (
        <div className="flex flex-col justify-center h-full text-center leading-tight">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-gray-500 text-xs">{row.code}</span>
        </div>
      ),
    },
    { header: "Product Name", field: "productName" },
    { header: "Direct Sales", field: "directSales" },
    { header: "Quantity", field: "quantity" },
    { header: "Referral Earnings", field: "referralEarnings" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];

  const indirectColumns = [
    { header: "Sr No.", field: "id" },
    {
      header: "Staff Name",
      field: "name",
      render: (row) => (
        <div className="flex flex-col justify-center h-full text-center leading-tight">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-gray-500 text-xs">{row.code}</span>
        </div>
      ),
    },
    { header: "Product Name", field: "productName" },
    { header: "Indirect Sales", field: "indirectSales" },
    { header: "Referral Earnings", field: "referralEarnings" },
    { header: "Total Revenue", field: "totalRevenue" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          
          { text: "Staff Management", href: "/staff-management" },
          { text: "Sales List" },
        ]}
      />
      <PagePath2 title={"Staff Sale"} />

      {/* Direct Sales Section */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="flex items-center p-4 justify-between border-b border-gray-200">
          <h3 className="text-lg font-semibold">Direct Sales</h3>
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        <div className="p-4">
          <DataTable
            columns={directColumns}
            data={currentDirect}
            currentPage={currentPageDirect}
            usersPerPage={itemsPerPageDirect}
          />
          <Pagination
            currentPage={currentPageDirect}
            totalPages={totalPagesDirect}
            totalItems={directSalesData.length}
            itemsPerPage={itemsPerPageDirect}
            onPageChange={setCurrentPageDirect}
          />
        </div>
      </div>

      {/* Indirect Sales Section */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="flex items-center p-4 justify-between border-b border-gray-200">
          <h3 className="text-lg font-semibold">Indirect Sales</h3>
          <select
            value={filtersOption}
            onChange={handleFiltersChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        <div className="p-4">
          <DataTable
            columns={indirectColumns}
            data={currentIndirect}
            currentPage={currentPageIndirect}
            usersPerPage={itemsPerPageIndirect}
          />
          <Pagination
            currentPage={currentPageIndirect}
            totalPages={totalPagesIndirect}
            totalItems={indirectSalesData.length}
            itemsPerPage={itemsPerPageIndirect}
            onPageChange={setCurrentPageIndirect}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffSales;
