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

const FaqList = () => {
  const navigate = useNavigate();
  const {
    loading: faqLoading,
    faqList,
    fetchFaqList,
    deleteFaqById,
  } = useFAQ();

  const {
    faqCategories,
    loadingFaqCategories,
    fetchFaqCategories,
  } = useDropdown();
  console.log("FAQ Categories in FaqList:", faqCategories);

  const [Faq, setFaq] = useState("");


  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const onChangeSelectFunc = (option) => {
    const selected = option ? option.value : "";
    setFaq(selected);
    setPage(1);
  };

  useEffect(() => {
    console.log("Fetching FAQ categories...");
    try {
      fetchFaqCategories();
    } catch (error) {
      console.error("Error in fetchFaqCategories effect:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    console.log("FAQ Categories updated:", faqCategories);
    console.log("Is array?", Array.isArray(faqCategories));
    console.log("Length:", faqCategories?.length);
  }, [faqCategories]);

  
  useEffect(() => {
    console.log("Fetching FAQ list with params:", { page, limit, searchTerm });
    fetchFaqList(page,Faq, limit, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit,Faq, searchTerm]);

  
  useEffect(() => {
    console.log("FAQ List updated:", faqList);
  }, [faqList]);
  


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
    try {
      const newSearchTerm = e?.target?.value || "";
      setSearchTerm(newSearchTerm);
      setPage(1);
    } catch (error) {
      console.error("Error changing search term:", error);
    }
  };

  const onChangeSelectFunc = (selected) => {
    try {
      console.log("Category selected:", selected);
      
      
      if (selected === null || selected === undefined) {
        setCategory("");
      } else if (selected && typeof selected === 'object' && selected.value !== undefined) {
        
        setCategory(selected.value);
      } else {
        
        setCategory("");
      }
      
      setPage(1);
    } catch (error) {
      console.error("Error changing category:", error);
      setCategory("");
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteFaqById(id);
    if (result && result.success) {
      fetchFaqList(page, limit, searchTerm);
    }
  };

  
  const faqsWithSerialNumbers = React.useMemo(() => {
    const data = faqList?.data || [];
    
    
    if (data.length > 0 && !data[0]?._id) {
      console.error("FAQ data missing _id field:", data[0]);
    }
    
    return data.map((faq, index) => ({
      ...faq,
      srNo: (page - 1) * limit + index + 1,
    }));
  }, [faqList?.data, page, limit]);

  
  const filteredFaqs = React.useMemo(() => {
    try {
      if (!category || category === "") {
        return faqsWithSerialNumbers;
      }
      return faqsWithSerialNumbers.filter((faq) => {
        
        return faq?.category && faq.category === category;
      });
    } catch (error) {
      console.error("Error filtering FAQs:", error);
      return faqsWithSerialNumbers;
    }
  }, [faqsWithSerialNumbers, category]);

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
          console.error("FAQ ID is missing:", row);
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
          console.error("FAQ ID is missing:", row);
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
          console.error("FAQ ID is missing:", row);
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
        searchTerm={searchTerm}
        handleSearchTerm={onSearchChange}
        addButtonText="Add FAQ"
        onClick={() => navigate("/app-management/faq/add")}
        showSelect
        options={faqCategories}
        selectPlaceHolder="Select Category"
        optionsLoading={loadingFaqCategories}
        onChangeSelectFunc={onChangeSelectFunc}
        />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
            {faqLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoaderSpinner />
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No FAQs found
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredFaqs}
                currentPage={page}
                usersPerPage={limit}
                actions={actions}
              />
            )}
          </div>

          {!faqLoading && filteredFaqs.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalEntries}
              itemsPerPage={limit}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqList;