import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button"; 

const ViewBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy data for demonstration
    const blog = {
        id,
        title: "Evolution Of The Pen",
        publishedAt: "10:30 AM, 13th September 2025",
        content: `
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

      <p>It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
      Aldus PageMaker including versions of Lorem Ipsum.</p>

      <h4>Why do we use it?</h4>
      <p>It is a long established fact that a reader will be distracted by the readable content of a page 
      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
      distribution of letters, as opposed to using 'Content here, content here', making it look like 
      readable English.</p>
    `,
    };

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
                {/* Title + Published Info */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h2 className="text-2xl font-semibold text-[#004AAD]">
                        {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Published On: <span className="font-medium">{blog.publishedAt}</span>
                    </p>
                </div>

                {/* Content */}
                <div
                    className="text-gray-700 leading-relaxed  items-center border-b border-gray-200 pb-5 mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex justify-center mt-5">
                    <Button
                        text="Back"
                        variant={2}
                        onClick={() => navigate("/blog-management")}
                    />
                </div>
            </div>

        </div>
    );
};

export default ViewBlog;
