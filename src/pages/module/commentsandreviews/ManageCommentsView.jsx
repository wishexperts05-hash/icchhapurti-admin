import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../../components/uiComponent/BreadCrumb';
import DetailsField from '../../../components/uiComponent/DetailsField';
import { User } from "lucide-react";
import PagePath2 from '../../../components/uiComponent/PagePath2';
import Button from '../../../components/uiComponent/Button';
export default function ManageCommentsView() {
    const navigate = useNavigate();
    const location = useLocation();

    // Sample comment data
    const commentData = {
        name: "vaishnavi Shobhane",
        location: "Maharashtra, India",
        mobileNumber: "+91 9876543210",
        email: "janecooper01@gmail.com",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        rating: 4,
        status: "Show",
        comment: "Lorem ipsum dolor sit amet consectetur. Etiam ut arcu arcu mattis praesent vel iaculis id eu. Porttitor nulla feugiat ligula auctor euismod eu eget consequat. Vitae non pretium non molestie. Egestas nisl arcu elit nisl amet nec tortor."
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleHide = () => {
        // Toggle hide/show status
        console.log("Hide/Show comment");
    };

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "Comment & Review", href: "/manage-comments" },
                        { text: "View Comment" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="View Comment"
                />

                {/* User Profile Card */}
                <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={commentData.profileImage}
                                alt={commentData.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                            />
                        </div>

                        {/* User Details */}
                        <div className="flex-1">
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">{commentData.name}</h2>
                                <p className="text-gray-600 mt-1">{commentData.location}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">Mobile Number :</p>
                                    <p className="text-gray-900">{commentData.mobileNumber}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">E-Mail ID :</p>
                                    <p className="text-gray-900">{commentData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Summary Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Review summary</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="space-y-6">
                            {/* Rating */}
                            <div className="flex items-start gap-4">
                                <p className="text-base font-semibold text-gray-900 min-w-[120px]">Rating :</p>
                                <div>{renderStars(commentData.rating)}</div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-4">
                                <p className="text-base font-semibold text-gray-900 min-w-[120px]">Status :</p>
                                <p className="text-green-600 font-medium">{commentData.status}</p>
                            </div>

                            {/* Comment */}
                            <div className="flex items-start gap-4">
                                <p className="text-base font-semibold text-gray-900 min-w-[120px]">Comment :</p>
                                <p className="text-gray-700 leading-relaxed flex-1">{commentData.comment}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-8 mt-8 mb-8">
                    <Button
                        text="Back"
                        variant={1}
                        onClick={handleBack}
                    />
                    <Button
                        text="Hide"
                        variant={2}
                        onClick={handleHide}
                    />
                </div>
            </div>
        </div>
    );
}