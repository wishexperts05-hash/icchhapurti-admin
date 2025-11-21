import React, { useState, useMemo, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { MdOutlineBlock } from "react-icons/md";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import useStaffManagement from "../../../../hooks/staffManagement/useStaffManagement";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const StaffManagement = () => {
    const { loading, staffList, fetchStaffList, updateStatus } = useStaffManagement();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    console.log("staffList:", staffList);
    const onPageChange = (data) => {
        setPage(data);
    };

    const onItemsPerPageChange = (data) => {
        setLimit(data);
    };
    useEffect(() => {
        fetchStaffList(page, limit, debouncedSearch);
    }, [page, limit, debouncedSearch]);

    const handleBlock = async (row) => {
        console.log("Toggling block status for user:", row);
        await updateStatus(row._id, { isActive: !row.isActive });
        fetchStaffList(page, limit, debouncedSearch);
    };

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleView = (row) => {
        console.log("Navigating to staff details with:", row);
        navigate(`/staff-management/staff-details/${row._id}`);
    };

    const handleDelete = (row) => {
        setStaffData((prev) => prev.filter((item) => item.id !== row.id));
    };

    const handleEdit = (row) => {
        navigate(`/staff-management/editStaff/${row._id}`,
            // { state: { staffData: row } }
        );
    };

    const handleAddStaff = () => {
        navigate("/staff-management/addStaff");
    };

    const handleAttendence = () => {
        navigate("/staff-management/attendanceListing");
    };

    const handleSales = () => {
        navigate("/staff-management/salesListing");
    };

    const columns = [
        { header: "Sr No.", field: "srNo" },
        { header: "Staff Name", field: "name" },
        { header: "Phone No.", field: "phoneNumber" },
        { header: "Referral Code", field: "referralCode" },
        { header: "Total User Registered", field: "totalUsersRegistered" },
        { header: "Status", field: "isActive" },
        { header: "Action", field: "action" },
    ];

    const actions = [
        {
            icon: <FaEye className="text-yellow-600" />,
            onClick: handleView,
            title: "View",
        },
        {
            icon: (row) => (
                <FaRegEdit
                    className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                    title="Edit"
                />
            ),
            onClick: handleEdit,
            title: "Edit",
        },
        {
            icon: <Trash2 className="w-5 h-5 text-red-600" />,
            onClick: handleDelete,
            title: "Delete",
        },
        {
            icon: (row) => (
                <MdOutlineBlock
                    className="w-5 h-5 text-yellow-600 cursor-pointer"
                    title="Block User"
                />
            ),
            onClick: handleBlock,
            title: "Toggle Status",
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen shadow-2xl">
            <BreadCrumb
                linkText={[
                    { text: "Staff Management" },
                ]}
            />

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

            <DataTable
                columns={columns}
                data={staffList?.staffList || []}
                actions={actions.map((a) =>
                    a.icon
                        ? {
                            ...a,
                            render: (row) => (
                                <button
                                    onClick={() => a.onClick(row)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                    title={a.title}
                                    disabled={a.disableCondition?.(row)}
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
                currentPage={staffList?.currentPage}
                totalPages={staffList?.totalPages}
                totalItems={staffList?.totalStaff}
                itemsPerPage={limit}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
};

export default StaffManagement;