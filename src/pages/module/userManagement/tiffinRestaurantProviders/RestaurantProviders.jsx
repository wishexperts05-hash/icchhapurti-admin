import { useEffect, useState } from "react";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "../../../../components/uiComponent/DeleteModel";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import useTiffinRestraunt from "../../../../hooks/userManagement/useTiffinRestraunt";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";
import useDebounce from "../../../../hooks/debounce/useDebounce";

function RestaurantProviders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();
  const {
    fetchTiffinRestrauntList,
    tiffinRestrauntList,
    loading,
    resetTiffinRestaurantDetails,
  } = useTiffinRestraunt();
  const {
    statusList,
    fetchStatusListForTiffinOwner,
    loading: dropdownLoading,
  } = useDropdown();

  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Tiffin/Restaurant Provider"
  );
  const debouncedSearch = useDebounce(searchQuery, 500);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Tiffin/Restaurant Provider Name", field: "name" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Address", field: "address" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const onPageChange = (data) => {
    console.log("data", data);
    setPage(data);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
  };

  const handleSelectChange = (option) => {
    setSelectedStatus(option ? option.value : "");
    setPage(1);
  };
  const handleSearchTerm = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchStatusListForTiffinOwner();
  }, []);
  useEffect(() => {
    fetchTiffinRestrauntList(page, limit, selectedStatus, debouncedSearch);
  }, [page, limit, selectedStatus, debouncedSearch]);

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          { text: "Tiffin/Restaurant Provider" },
        ]}
      />

      <PagePath2
        title="Tiffin/Restaurant Provider List"
        showSearch
        placeholder="Search by Provider Name"
        showSelect
        searchTerm={searchQuery}
        handleSearchTerm={handleSearchTerm}
        options={statusList}
        optionsLoading={dropdownLoading}
        onChangeSelectFunc={handleSelectChange}
        showAddButton
        addButtonText="Create New"
        onClick={() => {
          if (canCreate) {
            navigate("/tiffin-restaurant-provider/create-restaurant-provider");
          } else {
            alert("You don't have permission to create Hostel Owner");
          }
        }}
        disabled={!canCreate}
      />
      {/* <div className="min-h-full bg-white rounded-xl shadow-xl p-3 sm:p-6"> */}
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 font-inter ">
            <div className="border  border-gray-300 rounded-t-xl shadow-sm  overflow-hidden">
              <DataTable
                columns={columns}
                data={tiffinRestrauntList?.data}
                currentPage={tiffinRestrauntList?.pagination?.currentPage}
                usersPerPage={limit}
                actions={[
                  {
                    icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
                    title: "View",
                    onClick: (row) => {
                      if (canRead) {
                        resetTiffinRestaurantDetails();
                        navigate(
                          `/tiffin-restaurant-provider/restaurant-provider-details/${row._id}`
                        );
                      }
                    },
                    disableCondition: () => !canRead,
                    className: !canRead
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-100 hover:text-[#004AAD]",
                  },
                  {
                    icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
                    title: "Edit",
                    onClick: (row) => {
                      if (canUpdate) {
                        navigate(
                          `/tiffin-restaurant-provider/edit-restaurant-provider/${row._id}`
                        );
                      }
                    },
                    disableCondition: () => !canUpdate,
                    className: !canUpdate
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-100 hover:text-[#004AAD]",
                  },
                  // {
                  //   icon: <FiTrash2 className="w-5 h-5 text-[#FF6B00]" />,
                  //   title: "Delete",
                  //   onClick: (row) => handleDeleteClick(row),
                  // },
                ]}
              />
            </div>
          </div>
        )}
        {tiffinRestrauntList?.data?.length > 0 ? (
          <Pagination
            currentPage={tiffinRestrauntList?.pagination?.currentPage}
            totalPages={tiffinRestrauntList?.pagination?.totalPages}
            totalItems={tiffinRestrauntList?.pagination?.total}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        ) : null}
      </div>
    // </div>
  );
}

export default RestaurantProviders;
