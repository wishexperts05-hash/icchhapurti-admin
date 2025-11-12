import React, { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { MdOutlineBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Button from "../../../../components/uiComponent/Button";
import Pagination from "../../../../components/uiComponent/Pagination";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
const StaffManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();
    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const [staffData, setStaffData] = useState([
        { id: 1, name: "Arlene McCoy", code: "C001", phone: "9876543210", referralCode: "HVSGU45789", totalUsers: 50, status: false },
        { id: 2, name: "Jacob Jones", code: "G001", phone: "9876543210", referralCode: "HVSGU43255", totalUsers: 30, status: true },
        { id: 3, name: "Kristin Watson", code: "F001", phone: "9876543210", referralCode: "HVSGU486214", totalUsers: 20, status: false },
        { id: 4, name: "Jenny Wilson", code: "B001", phone: "9876543210", referralCode: "HVSGU45524", totalUsers: 10, status: false },
        { id: 5, name: "Kristin Watson", code: "F001", phone: "9876543210", referralCode: "HVSGU478652", totalUsers: 15, status: true },
        { id: 6, name: "Esther Howard", code: "A004", phone: "9876543210", referralCode: "HVSGU99999", totalUsers: 25, status: true },
        { id: 7, name: "Albert Flores", code: "Z111", phone: "9876543210", referralCode: "HVSGU67891", totalUsers: 18, status: false },
        { id: 8, name: "Theresa Webb", code: "W221", phone: "9876543210", referralCode: "HVSGU12841", totalUsers: 40, status: true },
        { id: 9, name: "Jane Cooper", code: "K101", phone: "9876543210", referralCode: "HVSGU44444", totalUsers: 35, status: false },
        { id: 10, name: "Darrell Steward", code: "Q001", phone: "9876543210", referralCode: "HVSGU11111", totalUsers: 45, status: true },
        { id: 11, name: "Bessie Cooper", code: "C002", phone: "9876543210", referralCode: "HVSGU22222", totalUsers: 12, status: false },
    ]);

    const filteredData = useMemo(
        () =>
            staffData.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [staffData, searchTerm]
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handleToggleStatus = (row) => {
        setStaffData((prev) =>
            prev.map((item) =>
                item.id === row.id ? { ...item, status: !item.status } : item
            )
        );
    };

    const handleDelete = (row) => {
        setStaffData((prev) => prev.filter((item) => item.id !== row.id));
    };

    const handleEdit = (row) => {
        alert(`Edit ${row.name}`);
    };

    const handleAddStaff = () => {
        navigate("/addStaff")
    };
    const handleAttendence = () => {
        navigate("/attendanceListing")
    }
    const handleSales = () => {
        navigate("/salesListing")
    }
    const columns = [
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="text-center">
                    <div className="font-medium">{row.name}</div>
                    <div className="text-gray-500 text-xs">{row.code}</div>
                </div>
            ),
        },
        { header: "Phone No.", field: "phone" },
        { header: "Referral Code", field: "referralCode" },
        { header: "Total User Registered", field: "totalUsers" },
        { header: "Action", field: "action" },
    ];

    const actions = [
        {
            icon: <Pencil className="w-4 h-4 text-green-600" />,
            onClick: handleEdit,
            title: "Edit",
        },
        {
            icon: <Trash2 className="w-4 h-4 text-red-600" />,
            onClick: handleDelete,
            title: "Delete",
        },
        {
            icon: (row) => (
                <MdOutlineBlock
                    className={`w-5 h-5 ${row.status
                        ? "text-yellow-600 cursor-pointer"
                        : "text-gray-400 cursor-pointer"
                        }`}
                    title={row.status ? "Unblock" : "Block"}
                />
            ),
            onClick: handleToggleStatus,
            title: "Toggle Status",
        },
    ];
    return (
        <div className=" bg-gray-50 min-h-screen shadow-2xl">
            {/* Breadcrumb Section */}
            <BreadCrumb
                linkText={[
                    { text: "Dashboard", href: "/dashboard" },
                    { text: "Staff Management" },
                ]}
            />

            {/* Header Bar */}
            <PagePath2
                title="Staff Management"
                showSearch={true}
                searchTerm={searchTerm}
                handleSearchTerm={handleSearchTerm}
                showAddButton={true}
                addButtonText="Add New Staff"
                onClick={handleAddStaff}
            />
            <PagePath2
                showAddButton
                showExtraButton
                extraButtonText="Sale"
                addButtonText="Attendence"
                onClick={handleAttendence}
                onExtraClick={handleSales}
            />


            {/* Data Table */}
            <DataTable
                columns={columns}
                data={currentItems}
                actions={actions.map((a) =>
                    a.icon
                        ? {
                            ...a,
                            render: (row) => (
                                <button
                                    onClick={() => a.onClick(row)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                    title={a.title}
                                    disabled={a.disableCondition?.(row)} // support conditional disabling
                                >
                                    {typeof a.icon === "function" ? a.icon(row) : a.icon}
                                </button>
                            ),
                        }
                        : a
                )}
            />

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

export default StaffManagement;
