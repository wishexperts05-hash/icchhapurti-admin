import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import useBlogManagement from "../../../../hooks/blogManagement/useBlogManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";

const BlogManagement = () => {
    const { blogList, loading, fetchBlogList, deleteBlog, resetBlogDetails} = useBlogManagement();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    
    const { subAdminAccess } = useLogin();
    const { canCreate, canRead, canUpdate, canDelete: canDeletePermission } = usePermissions(
        subAdminAccess,
        "Blog Management"
    );

    useEffect(() => {
        fetchBlogList(page, limit, debouncedSearch);
    }, [page, limit, debouncedSearch]);

    console.log("blogList:", blogList);

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

    const handleAddBlog = () => {
        navigate("/blog-management/add-blogs");
        resetBlogDetails();
    };

    const handleView = (row) => {
        navigate(`/blog-management/view-blogs/${row._id}`);
    };

    const handleEdit = (row) => {
        navigate(`/blog-management/edit-blogs/${row._id}`);
    };


    const handleDelete = async (row) => {
        await deleteBlog(row._id);
        fetchBlogList(page, limit, debouncedSearch);
    }

    const columns = [
        { header: "Sr.No", field: "srNo" },
        {
            header: "Blog Title",
            field: "title",
            render: (row) => (
                <span className="block text-gray-900 font-medium break-words whitespace-normal max-w-[850px]">
                    {row.title}
                </span>
            ),
        },
        { header: "Action", field: "action" },
    ];


    const actions = [
        {
            icon: <FaEye className="text-yellow-600" />,
            onClick: handleView,
            title: "View",
            disableCondition: () => !canRead
        },
        {
            icon: (row) => (
                <FaRegEdit
                    className="w-5 h-5 text-yellow-600 hover:text-yellow-700 transition-colors duration-200 cursor-pointer"
                    title="Edit"
                />
            ),
            onClick: handleEdit,
            title: "Edit",
            disableCondition: () => !canUpdate
        },
        {
            icon: <Trash2 className="w-5 h-5 text-red-600" />,
            onClick: handleDelete,
            title: "Delete",
            disableCondition: () => !canDeletePermission
        },
    ];

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            {/* Breadcrumb */}
            <BreadCrumb
                linkText={[
                    { text: "Blog Management" },
                ]}
            />

            {/* Page Header */}
            <PagePath2
                title="Blog Management"
                showSearch={true}
                searchTerm={search}
                handleSearchTerm={onSearchChange}
                showAddButton={true}
                addButtonText="Add New Blog"
                onClick={canCreate ? handleAddBlog : undefined}
                canCreate={canCreate}
            />

            {loading ? (
                <div className="flex w-full items-center justify-center py-10">
                    <LoaderSpinner />
                </div>
            ) : (
                <div className="rounded-t-2xl overflow-hidden shadow-lg border border-gray-200">
                    <DataTable
                        columns={columns}
                        data={blogList?.data || []}
                        actions={actions}
                        currentPage={page}
                        usersPerPage={limit}
                    />
                    <Pagination
                        currentPage={blogList?.page}
                        totalPages={blogList?.page}
                        totalItems={blogList?.total}
                        itemsPerPage={blogList?.limit}
                        onPageChange={onPageChange}
                        onItemsPerPageChange={onItemsPerPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
