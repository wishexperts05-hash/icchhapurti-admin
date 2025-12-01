import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";


const FaqList = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "General", label: "General" },
    { value: "Shop", label: "Shop" },
    { value: "Account", label: "Account" },
    { value: "Support", label: "Support" },
  ];

  const dummyFaqData = [
    {
      _id: "1",
      srNo: 1,
      category: "General",
      question: "How to redeem my coins?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
    },
    {
      _id: "2",
      srNo: 2,
      category: "Shop",
      question: "How to redeem my coins?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
    },
    {
      _id: "3",
      srNo: 3,
      category: "Account",
      question: "How to redeem my coins?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
    },
    {
      _id: "4",
      srNo: 4,
      category: "Support",
      question: "How to redeem my coins?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
    },
    {
      _id: "5",
      srNo: 5,
      category: "General",
      question: "How to redeem my coins?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etis epsum...",
    },
  ];

  const fetchFaqs = async () => {
    try {
      setLoading(true);

      let filteredData = [...dummyFaqData];

      if (category) {
        filteredData = filteredData.filter(
          (faq) => faq.category === category
        );
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setTotalEntries(filteredData.length);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setFaqs(paginatedData);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [page, limit, category, searchTerm]);

  const onPageChange = (data) => setPage(data);

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    setPage(1);
  };

  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  const onChangeSelectFunc = (selected) => {
    const categoryValue = selected?.value || "";
    setCategory(categoryValue);
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      console.log("Delete FAQ with id:", id);
      fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

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
      onClick: (row) => navigate(`/app-management/faq/view/${row._id}`),
    },
    {
      icon: <FaRegEdit className="w-5 h-5 text-[#cca547]" />,
      title: "Edit",
      onClick: (row) => navigate(`/app-management/faq/edit/${row._id}`),
    },
    {
      icon: <FiTrash2 className="w-5 h-5 text-[#cca547]" />,
      title: "Delete",
      onClick: (row) => handleDelete(row._id),
    },
  ];

  const totalPages = Math.ceil(totalEntries / limit);

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
        options={categoryOptions}
        selectPlaceHolder="Select Category"
        optionsLoading={loading}
        onChangeSelectFunc={onChangeSelectFunc}
      />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="overflow-x-auto">
          <div className="border border-gray-300 rounded-t-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <LoaderSpinner />
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No FAQs found
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={faqs}
                currentPage={page}
                usersPerPage={limit}
                actions={actions}
              />
            )}
          </div>

          {!loading && faqs.length > 0 && (
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