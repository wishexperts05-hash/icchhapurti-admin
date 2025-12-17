import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/debounce/useDebounce";
import Pagination from "../../../components/uiComponent/Pagination";
import useTargetManagement from "../../../hooks/targetManagment/useTargetManagment";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import usePermissions from "../../../hooks/auth/usePermissions";
import useLogin from "../../../hooks/auth/useLogin";

const TargetManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { subAdminAccess } = useLogin();
  const { canCreate } = usePermissions(
    subAdminAccess,
    "Target Management"
  );
  const { targetList, loading, fetchTargetList } = useTargetManagement();

  useEffect(() => {
    fetchTargetList(page, limit, debouncedSearch)
  }, [page, limit, debouncedSearch])

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };
  const totalPages = Math.ceil(
  (targetList?.total || 0) / limit
);


  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };

  const columns = [
    { header: "Sr.No", field: "srNo" },
    { header: "Staff Name", field: "staffName" },
    { header: "Daily Target", field: "dailyTarget" },
    { header: "Weakly Target", field: "weeklyTarget" },
    { header: "Target Achieved", field: "targetAchieved" },
    { header: "Tickets Earned", field: "ticketsEarned" },
  ];

  const handleSetTarget = () => {
    navigate("/target-management/setTarget-management");
  }

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
        onClick={canCreate ? handleSetTarget : undefined}
        canCreate={canCreate}
      />

      {
        <>
          {loading ? (
            <div className="flex w-full items-center justify-center py-10">
              <LoaderSpinner />
            </div>
          ) : (
            <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
              <Box>
                <DataTable
                  columns={columns}
                  data={targetList?.data || []}
                  currentPage={page}
                  usersPerPage={limit}
                />
              </Box>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={targetList?.total}
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
