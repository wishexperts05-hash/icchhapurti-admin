import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import useBlogManagement from "../../../../hooks/blogManagement/useBlogManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const ViewBlog = () => {
    const { fetchBlogDetails, blogDetail, loading } = useBlogManagement();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchBlogDetails(id);
    }, [id]);

    const publishedAt = blogDetail?.pubishedAt || blogDetail?.publishedAt || 'N/A';

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            {/* Breadcrumb */}
            <BreadCrumb
                linkText={[
                    { text: "Blog Management", href: "/blog-management" },
                    { text: "View Post" },
                ]}
            />
            <PagePath2 title="View Blog" showAddButton={false} showSearch={false} />

            {/* Blog Content Card */}
            <div className="bg-white rounded-2xl shadow-xl mt-4 p-6 border border-gray-100">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <LoaderSpinner />
                    </div>
                ) : (
                    <>
                        {/* Title + Published Info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-3 mb-4 gap-3">
                            <h2 className="text-2xl font-semibold text-[#004AAD]">
                                {blogDetail?.title || 'No Title'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Published On: <span className="font-medium">{publishedAt}</span>
                            </p>
                        </div>

                        {/* Image if present */}
                        {blogDetail?.imageUrl && (
                            <div className="mb-4 flex justify-center">
                                <img src={blogDetail?.imageUrl} alt={blogDetail?.title} className="w-full max-w-xl object-cover rounded-md" />
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="text-gray-700 leading-relaxed  items-center border-b border-gray-200 pb-5 mb-4"
                            dangerouslySetInnerHTML={{ __html: blogDetail?.body || '' }}
                        />

                        <div className="flex justify-center gap-4 mt-6">
                            <Button
                                text="Back"
                                variant={2}
                                onClick={() => navigate("/blog-management")}
                            />
                            <Button
                                text="Edit"
                                variant={1}
                                onClick={() => navigate(`/blog-management/edit-blogs/${id}`)}
                            />
                        </div>
                    </>
                ) }
            </div>

        </div>
    );
};

export default ViewBlog;
