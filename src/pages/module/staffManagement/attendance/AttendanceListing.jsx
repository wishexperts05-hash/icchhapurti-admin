import React, { useState, useEffect } from "react";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { User } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";

const AttendanceListing = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Sample static data (you can replace this with API data)
    const attendanceData = [
        {
            id: 1,
            name: "Arlene McCoy",
            code: "C001",
            loginTime: "9:00 AM",
            logoutTime: "5:30 PM",
            workingHours: "8 hours",
            distance: 25,
            status: "Present",
        },
        {
            id: 2,
            name: "Jacob Jones",
            code: "G001",
            loginTime: "9:00 AM",
            logoutTime: "5:30 PM",
            workingHours: "8 hours",
            distance: 20,
            status: "Present",
        },
        {
            id: 3,
            name: "Kristin Watson",
            code: "F001",
            loginTime: "9:00 AM",
            logoutTime: "5:30 PM",
            workingHours: "8 hours",
            distance: 45,
            status: "Present",
        },
        {
            id: 4,
            name: "Jenny Wilson",
            code: "B001",
            loginTime: "9:00 AM",
            logoutTime: "--",
            workingHours: "--",
            distance: "--",
            status: "Present",
        },
        {
            id: 5,
            name: "Kristin Watson",
            code: "F001",
            loginTime: "--",
            logoutTime: "--",
            workingHours: "--",
            distance: "--",
            status: "Absent",
        },
    ];

    // Filtered Data
    const filteredData = attendanceData.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            !statusFilter || item.status.toLowerCase() === statusFilter.value.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchTerm = (e) => setSearchTerm(e.target.value);
    const handleSelectChange = (option) => setStatusFilter(option);
    const handlePageChange = (page) => setCurrentPage(page);

    const columns = [
        {
            header: "Staff Name",
            field: "name",
            render: (row) => (
                <div className="flex flex-col text-center">
                    <span className="font-semibold">{row.name}</span>
                    <span className="text-gray-500 text-xs">{row.code}</span>
                </div>
            ),
        },
        { header: "Login Time", field: "loginTime" },
        { header: "Logout time", field: "logoutTime" },
        { header: "Working hours", field: "workingHours" },
        { header: "Distance(km)", field: "distance" },
        {
            header: "Status",
            field: "status",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${row.status === "Present"
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
            render: () => (
                <button
                    title="View Details"
                    className="p-2 rounded-full bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border border-yellow-400 transition"
                >
                    <User size={18} />
                </button>
            ),
        },
    ];

    return (
        <div className="">

            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Staff Management", href: "/staff-Management" },
                    {text:"Attendance List"}
                ]}
            />
            {/* Page Header */}
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

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={currentItems}
                currentPage={currentPage}
                usersPerPage={itemsPerPage}
            />

            {/* Pagination */}
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
