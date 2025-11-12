import React, { useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";


const StaffSales = () => {
    const [filterOption, setFilterOption] = useState("");
    const [filtersOption, setFiltersOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const handleFiltersChange = (e) => {
        setFiltersOption(e.target.value);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const directSalesData = [
        {
            id: 1,
            name: "Arlene McCoy",
            code: "C001",
            productName: "Pen",
            directSales: 500,
            quantity: 50,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
        {
            id: 2,
            name: "Jacob Jones",
            code: "G001",
            productName: "Pen",
            directSales: 500,
            quantity: 50,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
        {
            id: 3,
            name: "Kristin Watson",
            code: "F001",
            productName: "Pen",
            directSales: 500,
            quantity: 50,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
        {
            id: 4,
            name: "Jenny Wilson",
            code: "B001",
            productName: "Pen",
            directSales: 500,
            quantity: 50,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
        {
            id: 5,
            name: "Kristin Watson",
            code: "F001",
            productName: "Pen",
            directSales: 500,
            quantity: 50,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
    ];

    const indirectSalesData = [
        {
            id: 1,
            name: "Arlene McCoy",
            code: "C001",
            productName: "Pen",
            indirectSales: 150,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
        {
            id: 2,
            name: "Jacob Jones",
            code: "G001",
            productName: "Pen",
            indirectSales: 150,
            referralEarnings: "₹700",
            totalRevenue: "₹7000",
        },
    ];
    const currentDirect = directSalesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const currentIndirect = indirectSalesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const directColumns = [
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="flex flex-col justify-center h-full text-center leading-tight">
                    <span className="font-semibold text-gray-900">{row.name}</span>
                    <span className="flex justify-center text-start text-gray-500 text-xs">{row.code}</span>
                </div>
            )

        },
        { header: "Product Name", field: "productName" },
        { header: "Direct Sales", field: "directSales" },
        { header: "Quantity", field: "quantity" },
        { header: "Referral Earnings", field: "referralEarnings" },
        { header: "Total Revenue", field: "totalRevenue" },
    ];

    const indirectColumns = [
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="flex flex-col justify-center h-full text-center leading-tight">
                    <span className="font-semibold text-gray-900">{row.name}</span>
                    <span className="flex justify-center text-start text-gray-500 text-xs">{row.code}</span>
                </div>
            ),
        },
        { header: "Product Name", field: "productName" },
        { header: "Indirect Sales", field: "indirectSales" },
        { header: "Referral Earnings", field: "referralEarnings" },
        { header: "Total Revenue", field: "totalRevenue" },
    ];

    return (
        <div className=" space-y-6">
            {/* Breadcrumb */}
            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Staff Management", href: "/staff-Management" },
                    { text: "Sales List" }
                ]}
            />
            <PagePath2 title={"Staff Sale"} />
            {/* Direct Sales Section */}
            <div className="bg-white rounded-2xl border border-gray-200">
                <div className="flex items-center p-4 justify-between border-b border-gray-200 overflow-visible relative z-20">
                    <h3 className="text-lg font-semibold">Direct Sales</h3>
                    <select
                        value={filterOption}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white relative z-[50]"
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
                        currentPage={currentPage}
                        usersPerPage={itemsPerPage}
                    />
                </div>
            </div>

            {/* Indirect Sales Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200">
                <div className="flex items-center p-4 justify-between border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Indirect Sales</h3>
                    <select
                        value={filtersOption}
                        onChange={handleFiltersChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10 bg-white"
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
                        currentPage={currentPage}
                        usersPerPage={itemsPerPage}
                    />
                </div>

            </div>
        </div>
    );
};

export default StaffSales;
