import { useEffect, useState } from "react";
import DataTable from "../../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import useUserManagement from "../../../../hooks/userManagement/userUserManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useDebounce from "../../../../hooks/debounce/useDebounce";

function Customer() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { loading, fetchCustomerList, customerList } = useUserManagement();

  const {
    statusList,
    fetchStatusListForTiffinOwner,
    loading: dropdownLoading,
  } = useDropdown();

  const { subAdminAccess } = useLogin();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions(
    subAdminAccess,
    "Customer"
  );

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchStatusListForTiffinOwner();
  }, []);
  useEffect(() => {
    fetchCustomerList(page, limit, debouncedSearch, status);
  }, [page, limit, debouncedSearch, fetchCustomerList]);

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
    setPage(1);
  };

  const onChangeSelectFunc = (option) => {
    setStatus(option ? option.value : "");
  };

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Customer Name", field: "name" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[{ text: "User Management" }, { text: "Customer" }]}
      />

      <PagePath2
        title="Customer List"
        showSearch
        searchTerm={search}
        handleSearchTerm={onSearchChange}
        showSelect
        options={statusList}
        optionsLoading={dropdownLoading}
        onChangeSelectFunc={onChangeSelectFunc}
      />
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 font-inter ">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden ">
            {customerList?.data?.length > 0 ? (
              <DataTable
                columns={columns}
                data={customerList?.data}
                currentPage={page}
                usersPerPage={limit}
                actions={[
                  {
                    icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
                    title: "View",
                    onClick: (row) => {
                      if (canRead) {
                        navigate(`/customers/customer-details/${row._id}`);
                      }
                    },
                    //  },
                    disableCondition: () => !canRead,
                    className: !canRead
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
            currentPage={customerList?.pagination?.currentPage ?? 1}
            totalPages={customerList?.pagination?.totalPages ?? 1}
            totalItems={customerList?.pagination?.total ?? 0}
            itemsPerPage={customerList?.pagination?.limit ?? limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Customer;
