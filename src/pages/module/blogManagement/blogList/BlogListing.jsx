import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
const BlogManagement = () => {
    // Dummy Data
    const initialBlogs = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        blogTitle: `Evolution of The Pen ${i + 1}`,
        description: "Known for their smoothness, reliability, and consistency.",
    }));

    const [searchTerm, setSearchTerm] = useState("");
    const [blogs, setBlogs] = useState(initialBlogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    // Search filtering
    const filteredBlogs = useMemo(() => {
        return blogs.filter((item) =>
            item.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [blogs, searchTerm]);

    // Pagination logic
    const totalItems = filteredBlogs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

    // Table Columns
    const columns = [
        { header: "Sr.No", field: "srNo" },
        {
            header: "Blog Title",
            field: "blogTitle",
            render: (row) => (
                <span className="block text-gray-900 font-medium break-words whitespace-normal max-w-[850px]">
                    {row.blogTitle}
                </span>
            ),
        },

        // { header: "Description", field: "description" }, 
        { header: "Action", field: "action" },
    ];


    const actions = [
        {
            icon: (row) => (
                <Eye
                    size={22}
                    className="text-[#CCA547] hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                    title="View Blog"
                />
            ),
            onClick: (row) => navigate(`/blog-management/view-blogs/${row.id}`),
        },
        {
            icon: (row) => (
                <FaRegEdit
                    size={22}
                    className="text-[#CCA547] hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                    title="Edit Blog"
                />
            ),
            onClick: (row) => navigate(`/blog-management/edit-blogs/${row.id}`),
        },
        {
            icon: (row) => (
                <Trash2
                    size={22}
                    className="text-[#CCA547] hover:text-red-600 transition-colors duration-200 cursor-pointer"
                    title="Delete Blog"
                    onClick={(e) => e.stopPropagation()} 
                />
            ),
            onClick: (row) => {
                if (
                    window.confirm(`Are you sure you want to delete "${row.blogTitle}"?`)
                ) {
                    setBlogs((prev) => prev.filter((b) => b.id !== row.id));
                }
            },
        },
    ];

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            {/* Breadcrumb */}
            <BreadCrumb
                linkText={[
                    { text: "Dashboard", href: "/dashboard" },
                    { text: "Blog Management" },
                ]}
            />

            {/* Page Header */}
            <PagePath2
                title="Blog Management"
                searchTerm={searchTerm}
                handleSearchTerm={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                showSearch={true}
                showAddButton={true}
                addButtonText="Add Blog"
                onClick={() => navigate("/blog-management/add-blogs")}
            />

            {/* Data Table */}
            <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
                <DataTable
                    columns={columns}
                    data={currentBlogs}
                    actions={actions}
                    currentPage={currentPage}
                    usersPerPage={itemsPerPage}
                />
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
        </div>
    );
};

export default BlogManagement;
