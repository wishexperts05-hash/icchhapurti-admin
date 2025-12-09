import React, {  useState } from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/debounce/useDebounce";
import Pagination from "../../../components/uiComponent/Pagination";
import useTargetManagement from "../../../hooks/targetManagment/useTargetManagment";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

const TargetManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { targetData, loading, total, error } = useTargetManagement(
    page,
    limit,
    debouncedSearch
  );

  const totalPages = Math.ceil(total / limit);
  console.log(targetData);
  // Static dummy data
  // const targetData = [
  //   {
  //     srNo: 1,
  //     staffName: "Rahul Sharma",
  //     dailyTarget: 50,
  //     weaklyTarget: 300,
  //     targetAchievd: 280,
  //     ticketEarned: 45,
  //   },
  //   {
  //     srNo: 2,
  //     staffName: "Priya Verma",
  //     dailyTarget: 40,
  //     weaklyTarget: 250,
  //     targetAchievd: 260,
  //     ticketEarned: 52,
  //   },
  //   {
  //     srNo: 3,
  //     staffName: "Amit Patil",
  //     dailyTarget: 55,
  //     weaklyTarget: 330,
  //     targetAchievd: 310,
  //     ticketEarned: 48,
  //   },
  //   {
  //     srNo: 4,
  //     staffName: "Sneha Kulkarni",
  //     dailyTarget: 45,
  //     weaklyTarget: 280,
  //     targetAchievd: 275,
  //     ticketEarned: 41,
  //   },
  //   {
  //     srNo: 5,
  //     staffName: "Karan Gupta",
  //     dailyTarget: 60,
  //     weaklyTarget: 360,
  //     targetAchievd: 355,
  //     ticketEarned: 60,
  //   },
  //   {
  //     srNo: 6,
  //     staffName: "Neha Singh",
  //     dailyTarget: 48,
  //     weaklyTarget: 290,
  //     targetAchievd: 300,
  //     ticketEarned: 54,
  //   },
  //   {
  //     srNo: 7,
  //     staffName: "Ram Singh",
  //     dailyTarget: 48,
  //     weaklyTarget: 290,
  //     targetAchievd: 300,
  //     ticketEarned: 54,
  //   },
  //   {
  //     srNo: 8,
  //     staffName: "Ritu Singh",
  //     dailyTarget: 48,
  //     weaklyTarget: 290,
  //     targetAchievd: 300,
  //     ticketEarned: 54,
  //   },

  // ];

  const onPageChange = (newPage) => {
    setPage(newPage);
  };
  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };
  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };
  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Staff Name", field: "staffName" },
    { header: "Daily Target", field: "dailyTarget" },
    { header: "Weakly Target", field: "weeklyTargeta" },
    { header: "Target Achieved", field: "targetAchieved" },
    { header: "Tickets Earned", field: "ticketsEarned" },
  ];
  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Target Management" }]} />
      <PagePath2
        title="Target Management"
        // ShowSearch
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        // ShowAddButton
        showAddButton
        addButtonText="Set Target"
        onClick={() => navigate("/target-management/setTarget-management")}
      />

      {
        <>
          {loading ? (
            <div className="flex w-full items-center justify-center py-10">
              <LoaderSpinner />
            </div>
          ) : (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <Box>
                <DataTable
                  columns={columns}
                  data={targetData}
                  currentPage={page}
                  usersPerPage={limit}
                />
              </Box>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={total}
                itemsPerPage={limit}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
              />
            </div>
          )}
        </>
      }
    </Box>
  );
};

export default TargetManagement;
