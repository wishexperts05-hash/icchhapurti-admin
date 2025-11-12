import React, { useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";

const StaffSales = () => {
    const [filterOption, setFilterOption] = useState("Today");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const handleFilterChange = (option) => {
        setFilterOption(option?.value || "Today");
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

    const totalItemsDirect = directSalesData.length;
    const totalPagesDirect = Math.ceil(totalItemsDirect / itemsPerPage);
    const currentDirect = directSalesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItemsIndirect = indirectSalesData.length;
    const totalPagesIndirect = Math.ceil(totalItemsIndirect / itemsPerPage);
    const currentIndirect = indirectSalesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const directColumns = [
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="flex flex-col text-left">
                    <span className="font-semibold">{row.name}</span>
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
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="flex flex-col text-left">
                    <span className="font-semibold">{row.name}</span>
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
        <div className=" space-y-6">
            {/* Breadcrumb */}
            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Staff Management", href: "/staff-Management" },
                    { text: "Sales List" }
                ]}
            />
           
            {/* Direct Sales Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Direct Sales</h3>
                    <PagePath2
                        showSelect
                        options={["Today", "This Week", "This Month"]}
                        selectPlaceHolder={filterOption}
                        onChangeSelectFunc={handleFilterChange}
                    />
                </div>

                <div className="p-4">
                    <DataTable
                        columns={directColumns}
                        data={currentDirect}
                        currentPage={currentPage}
                        usersPerPage={itemsPerPage}
                    />
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPagesDirect}
                    totalItems={totalItemsDirect}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Indirect Sales Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Indirect Sales</h3>
                    <PagePath2
                        showSelect
                        options={["Today", "This Week", "This Month"]}
                        selectPlaceHolder={filterOption}
                        onChangeSelectFunc={handleFilterChange}
                    />
                </div>

                <div className="p-4">
                    <DataTable
                        columns={indirectColumns}
                        data={currentIndirect}
                        currentPage={currentPage}
                        usersPerPage={itemsPerPage}
                    />
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPagesIndirect}
                    totalItems={totalItemsIndirect}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default StaffSales;
