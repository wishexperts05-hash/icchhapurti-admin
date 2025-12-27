import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useFAQ from "../../../../hooks/appManagement/useFAQ";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useDebounce from "../../../../hooks/debounce/useDebounce";

const FaqList = () => {
  const navigate = useNavigate();
  const {
    loading: faqLoading,
    faqList,
    fetchFaqList,
    deleteFaqById,
  } = useFAQ();

  const { fetchUserTypeFAQ, dropdownfaq, loadingFaqCategories } = useDropdown();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchUserTypeFAQ();
  }, []);

  //   const faqCategoryOptions = React.useMemo(() => {
  //   if (!Array.isArray(dropdownfaq)) return [];

  //   return dropdownfaq.map((item) => ({
  //     label: item,
  //     value: item,
  //   }));
  // }, [dropdownfaq]);

  useEffect(() => {
    fetchFaqList(page, limit, debouncedSearch, category);
  }, [page, limit, debouncedSearch, category]);

  useEffect(() => {}, [faqList]);

  const onPageChange = (data) => {
    try {
      setPage(data);
    } catch (error) {
      console.error("Error changing page:", error);
    }
  };

  const onItemsPerPageChange = (data) => {
    try {
      setLimit(data);
      setPage(1);
    } catch (error) {
      console.error("Error changing items per page:", error);
    }
  };
  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const onChangeSelectFunc = (option) => {
    const value = option?.value ?? "";
    setCategory(value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    const result = await deleteFaqById(id);
    if (result && result.success) {
      fetchFaqList(page, limit, debouncedSearch, category);
    }
  };

  useEffect(() => {}, [page, limit, debouncedSearch, category]);

  const faqsWithSerialNumbers = React.useMemo(() => {
    const data = faqList?.data || [];

    // if (data.length > 0 && !data[0]?._id) {
    //   // console.error("FAQ data missing _id field:", data[0]);
    // }

    return data.map((faq, index) => ({
      ...faq,
      srNo: (page - 1) * limit + index + 1,
    }));
  }, [faqList?.data, page, limit]);

  const columns = [
    { header: "Sr.No.", field: "srNo" },
    { header: "Category", field: "category" },
    { header: "Question", field: "question" },
    { header: "Answer", field: "answer" },
    { header: "Action", field: "action" },
  ];

  const actions = [
    {
      icon: <FiEye className="w-5 h-5 text-[#cca547]" />,
      title: "View",
      onClick: (row) => {
        if (row?._id) {
          navigate(`/app-management/faq/view/${row._id}`);
        } else {
          // console.error("FAQ ID is missing:", row);
        }
      },
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#cca547]" />,
      title: "Edit",
      onClick: (row) => {
        if (row?._id) {
          navigate(`/app-management/faq/edit/${row._id}`);
        } else {
          // console.error("FAQ ID is missing:", row);
        }
      },
    },
    {
      icon: <FiTrash2 className="w-5 h-5 text-[#cca547]" />,
      title: "Delete",
      onClick: (row) => {
        if (row?._id) {
          handleDelete(row._id);
        } else {
          // console.error("FAQ ID is missing:", row);
        }
      },
    },
  ];

  const totalPages = faqList?.pagination?.totalPages || 1;
  const totalEntries = faqList?.pagination?.totalRecords || 0;

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-6">
      <BreadCrumb linkText={[{ text: "App Management" }, { text: "FAQ" }]} />

      <PagePath2
        title="FAQ"
        showSearch
        showAddButton
        placeholder="Search FAQ"
        searchTerm={searchQuery}
        handleSearchTerm={onSearchChange}
        addButtonText="Add FAQ"
        onClick={() => navigate("/app-management/faq/add")}
        showSelect
        selectPlaceHolder="Select Category"
        options={dropdownfaq} // ✅ ADD THIS LINE
        optionsLoading={loadingFaqCategories}
        // value={faqCategoryOptions.find(opt => opt.value === category) || null}
        onChangeSelectFunc={onChangeSelectFunc}
      />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
            {faqLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoaderSpinner />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={faqsWithSerialNumbers}
                currentPage={page}
                usersPerPage={limit}
                actions={actions}
              />
            )}
          </div>

          {/* {!faqLoading && filteredFaqs.length > 0 && ( */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalEntries}
            itemsPerPage={limit}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FaqList;
