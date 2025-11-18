import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { MapPin } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";

const AttendanceListing = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const attendanceData = [
        { id: 1, name: "Arlene McCoy", code: "C001", loginTime: "9:00 AM", logoutTime: "5:30 PM", workingHours: "8 hours", distance: 25, status: "Present" },
        { id: 2, name: "Jacob Jones", code: "G001", loginTime: "9:00 AM", logoutTime: "5:30 PM", workingHours: "8 hours", distance: 20, status: "Present" },
        { id: 3, name: "Kristin Watson", code: "F001", loginTime: "9:00 AM", logoutTime: "5:30 PM", workingHours: "8 hours", distance: 45, status: "Present" },
        { id: 4, name: "Jenny Wilson", code: "B001", loginTime: "9:00 AM", logoutTime: "--", workingHours: "--", distance: "--", status: "Present" },
        { id: 5, name: "Kristin Watson", code: "F001", loginTime: "--", logoutTime: "--", workingHours: "--", distance: "--", status: "Absent" },
    ];

    const filteredData = attendanceData.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            !statusFilter || item.status.toLowerCase() === statusFilter.value?.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchTerm = (e) => setSearchTerm(e.target.value);
    const handleSelectChange = (option) => setStatusFilter(option);
    const handlePageChange = (page) => setCurrentPage(page);

    const handleViewMap = (id) => {
        navigate(`/staff-management/staff-map/${id}`);
    };

    const actions = [
        {
            icon: () => (
                <MapPin className="text-yellow-600 cursor-pointer" />
            ),
            onClick: (row) => handleViewMap(row.id),
            title: "Map View",
        },
    ];

    const columns = [
        { header: "Sr No.", field: "id" },
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
        { header: "Login Time", field: "loginTime" },
        { header: "Logout Time", field: "logoutTime" },
        { header: "Working Hours", field: "workingHours" },
        { header: "Distance (km)", field: "distance" },
        {
            header: "Status",
            field: "status",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${row.status?.trim().toLowerCase() === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    ● {row.status}
                </span>

            ),
        },
        {
            header: "Action",
            field: "action",

        },
    ];

    return (
        <div>
            <BreadCrumb
                linkText={[
                    
                    { text: "Staff Management", href: "/staff-management" },
                    { text: "Attendance List" },
                ]}
            />

            <PagePath2
                title="Staff Attendance List"
                showSearch
                searchTerm={searchTerm}
                handleSearchTerm={handleSearchTerm}
                showSelect
                options={["Present", "Absent"]}
                onChangeSelectFunc={handleSelectChange}
                selectPlaceHolder="Select Status"
            />

            <DataTable
                columns={columns}
                data={currentItems}
                currentPage={currentPage}
                usersPerPage={itemsPerPage}
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AttendanceListing;
