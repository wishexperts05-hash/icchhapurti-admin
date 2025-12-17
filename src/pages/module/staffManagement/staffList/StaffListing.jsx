import React, { useState, useEffect } from "react";
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
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";

const StaffManagement = () => {
    const navigate = useNavigate();
    const { loading, staffList, fetchStaffList, updateStatus, deleteStaff } = useStaffManagement();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const { subAdminAccess } = useLogin();
    const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
        subAdminAccess,
        "Staff Management"
    );

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

    const handleView = (row) => {
        console.log("Navigating to staff details with:", row);
        navigate(`/staff-management/staff-details/${row._id}`);
    };

    const handleDelete = async (row) => {
        const result = await deleteStaff(row._id);
        if (result) {
            fetchStaffList(page, limit, debouncedSearch);
        }
    };

    const handleEdit = (row) => {
        navigate(`/staff-management/editStaff/${row._id}`);
    };

    const handleAddStaff = () => {
        navigate("/staff-management/addStaff");
    };

    const handleAttendence = () => {
        navigate("/staff-management/attendanceListing");
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
            title: "View",
            onClick: handleView,
            disableCondition: () => !canRead,
        },
        {
            icon: (row) => (
                <FaRegEdit
                    className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                    title="Edit"
                />
            ),
            title: "Edit",
            onClick: handleEdit,
            disableCondition: () => !canUpdate,
        },
        {
            icon: <Trash2 className="w-5 h-5 text-red-600" />,
            title: "Delete",
            onClick: handleDelete,
            disableCondition: () => !canDelete,
        },
        {
            icon: (row) => (
                <MdOutlineBlock
                    className="w-5 h-5 text-yellow-600 cursor-pointer"
                    title="Block User"
                />
            ),
            title: "Toggle Status",
            onClick: handleBlock,
            disableCondition: () => !canUpdate,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <BreadCrumb linkText={[{ text: "Staff Management" }]} />

            <PagePath2
                title="Staff Management"
                showSearch={true}
                searchTerm={searchTerm}
                handleSearchTerm={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                }}
                showAddButton={true}
                addButtonText="Add New Staff"
                onClick={canCreate ? handleAddStaff : undefined}
                canCreate={canCreate}
                showExtraButton={true}
                extraButtonText="Attendance"
                onExtraClick={handleAttendence}
            />

            {loading ? (
                <div className="flex w-full items-center justify-center py-10">
                    <LoaderSpinner />
                </div>
            ) : (
                <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
                    <DataTable
                        columns={columns}
                        data={staffList?.staffList?.map((staff, index) => ({
                            ...staff,
                            srNo: (page - 1) * limit + index + 1
                        })) || []}
                        currentPage={staffList?.currentPage}
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
            )}
        </div>
    );
};

export default StaffManagement;