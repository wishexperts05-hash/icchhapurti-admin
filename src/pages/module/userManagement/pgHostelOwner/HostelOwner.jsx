import { useEffect, useState } from "react";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "../../../../components/uiComponent/DeleteModel";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import { toast } from "react-toastify";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useDebounce from "../../../../hooks/debounce/useDebounce";

function HostelOwner() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const {
    statusList,
    fetchStatusListForTiffinOwner,
    loading: dropdownLoading,
  } = useDropdown();

  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "PG/Hostel Owner"
  );

  const debouncedSearch = useDebounce(search, 500);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const {
    loading,
    fetchPGHostelOwnersList,
    pgHostelOwnersList,
    deletePGHostelOwner,
  } = useUserManagement();

  // const handleDeleteClick = (user) => {
  //   setUserToDelete(user._id);
  //   setShowDeleteModal(true);
  // };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleRemove = () => {
    deletePGHostelOwner(userToDelete, page, limit, search, status);
    setShowDeleteModal(false);
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "PG/Hostel Owner Name", field: "fullName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Address", field: "firstAddress" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  useEffect(() => {
    fetchStatusListForTiffinOwner();
  }, []);
  useEffect(() => {
    fetchPGHostelOwnersList(page, limit, debouncedSearch, status);
  }, [page, limit, debouncedSearch, status, fetchPGHostelOwnersList]);

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    setPage(1);
  };

  const onChangeSelectFunc = (option) => {
    setStatus(option ? option.value : "");
  };

  const handleDelete = async (id) => {
    await deletePGHostelOwner(id);
    fetchPGHostelOwnersList(page, limit, search, status);
  };

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[{ text: "User Management" }, { text: "PG/Hostel Owner " }]}
      />

      <PagePath2
        title="PG/Hostel Owner List"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showSelect
        options={statusList}
        optionsLoading={dropdownLoading}
        onChangeSelectFunc={onChangeSelectFunc}
        showAddButton
        addButtonText="Create New"
        onClick={() => {
          if (canCreate) {
            navigate("/pg-hostel-owner/create-hostel-owner");
          } else {
            alert("You don't have permission to create Hostel Owner");
          }
        }}
        disabled={!canCreate}
      />
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 font-inter ">
          <div className="border  border-gray-300 rounded-t-xl shadow-sm  overflow-hidden">
            {pgHostelOwnersList?.data?.length > 0 ? (
              <DataTable
                columns={columns}
                data={pgHostelOwnersList?.data}
                currentPage={page}
                usersPerPage={limit}
                actions={[
                  {
                    icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
                    title: canRead ? "View" : "No permission to view",
                    onClick: (row) => {
                      if (canRead) {
                        navigate(
                          `/pg-hostel-owner/hostel-owner-details/${row._id}`
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
                    title: canUpdate ? "Edit" : "No permission to edit",
                    onClick: (row) => {
                      if (row.isDeleted) {
                        toast.info(
                          "This user has been deleted and cannot be edited."
                        );
                      } else if (canUpdate) {
                        navigate(
                          `/pg-hostel-owner/edit-hostel-owner/${row._id}`
                        );
                      }
                    },
                    disableCondition: () => !canUpdate,
                    className: !canUpdate
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-100 hover:text-[#004AAD]",
                  },
                  {
                    icon: <FiTrash2 className="w-5 h-5 text-[#FF6B00]" />,
                    title: "Delete",
                    onClick: (row) => {
                      if (canDelete) {
                        handleDelete(row?._id);
                      }
                    },
                    disableCondition: () => !canDelete,
                    className: !canDelete
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-100 hover:text-[#004AAD]",
                  },
                ]}
              />
            ) : (
              <div className="flex justify-center items-center h-40 text-gray-500 font-medium">
                Users not found
              </div>
            )}
          </div>
          <Pagination
            currentPage={pgHostelOwnersList?.pagination?.currentPage || 1}
            totalPages={pgHostelOwnersList?.pagination?.totalPages || 1}
            totalItems={pgHostelOwnersList?.pagination?.total || 0}
            itemsPerPage={pgHostelOwnersList?.pagination?.limit || 10}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}

      <DeleteModal
        open={showDeleteModal}
        title="Remove User"
        message="Are you sure you want to remove this user? This action cannot be undone."
        confirmText="Remove"
        onCancel={handleCancelDelete}
        onConfirm={handleRemove}
      />
    </div>
  );
}

export default HostelOwner;
