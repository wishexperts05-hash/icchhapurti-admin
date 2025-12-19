import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { MapPin } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import useStaffManagement from "../../../../hooks/staffManagement/useStaffManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const AttendanceListing = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const {
  fetchStaffAttendance,
  attendanceList,
  attendancePagination,
  attendanceLoading,
} = useStaffManagement();


useEffect(() => {
  fetchStaffAttendance({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });
}, [currentPage, searchTerm]);


const tableData = attendanceList.map((item, index) => ({
  id: item._id ,
  name: item.staff?.name || "--",
  code: item.staff?.staffId || "--",
  loginTime: item.loginTime || "--",
  logoutTime: item.logoutTime || "--",
  workingHours: item.workingTimeHours
    ? `${item.workingTimeHours} hrs`
    : "--",
  distance: item.totalDistanceKm ?? "--",
  status: item.loginTime ? "Present" : "Absent",
}));


const totalPages = attendancePagination?.totalPages || 1;
const totalItems = attendancePagination?.totalRecords || 0;

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchTerm = (e) => setSearchTerm(e.target.value);
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
        { header: "Sr No.", field: "SrNO" },
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
                // showSelect
                // options={["Present", "Absent"]}
                // onChangeSelectFunc={handleSelectChange}
                // selectPlaceHolder="Select Status"
            />

{attendanceLoading ?( <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>):(
            <div> 
            <DataTable
                columns={columns}
                data={tableData}
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
            )}
        </div>
    );
};

export default AttendanceListing;
