import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    Phone,
    Mail,
    Eye,
    EyeOff,
    MessageSquare
} from "lucide-react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useCommentandReviews from "../../../hooks/CommentandReviews/useCommentandReviews";
import Profile from "../../../assets/user.png";

export default function ManageCommentsView() {
    const navigate = useNavigate();
    const { reviewId, reviewType } = useParams();

    const { loading, changeStatus, commentReviewById, fetchReviewById } = useCommentandReviews();

    useEffect(() => {
        if (reviewId && reviewType) {
            fetchReviewById(reviewId, reviewType);
        }
    }, [reviewId, reviewType]);

    const handleBack = () => {
        navigate("/manage-comments");
    };

    const handleHide = async () => {
        if (!commentReviewById?._id || loading) return;
        const newStatus = commentReviewById.status === "show" ? "hide" : "show";
        const payload = { status: newStatus };

        await changeStatus(commentReviewById._id, commentReviewById.reviewType, payload);
        fetchReviewById(reviewId, reviewType);
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.span
                        key={star}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: star * 0.05 }}
                        className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                        whileHover={{ scale: 1.2 }}
                    >
                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                    </motion.span>
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">
                    ({rating}/5)
                </span>
            </div>
        );
    };

    const commentData = commentReviewById && {
        name: commentReviewById.name || "-",
        location: commentReviewById.address || "Maharashtra, India",
        mobileNumber: commentReviewById.mobileNumber || "-",
        email: commentReviewById.email || "-",
        profileImage: commentReviewById.profileImage || Profile,
        rating: commentReviewById.stars || 0,
        status: commentReviewById.status === "show" ? "Show" : "Hide",
        comment: commentReviewById.comment || "-",
        createdAt: commentReviewById.createdAt || new Date().toISOString(),
        reviewType: commentReviewById.reviewType || "-",
    };

    return (
        <div className="max-w-7xl mx-auto">
            <BreadCrumb
                linkText={[
                    { text: "Comment & Review", href: "/manage-comments" },
                    { text: "View Comment" },
                ]}
            />
            <PagePath2 title="Review Details" />

            {loading || !commentData ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <LoaderSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading review details...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* User Profile Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Profile Image with Animation */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <div className="relative">
                                    <img
                                        src={commentData.profileImage}
                                        alt={commentData.name}
                                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {commentData.reviewType}
                                    </div>
                                </div>
                            </motion.div>

                            {/* User Details */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {commentData.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <p>{commentData.location}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Phone className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Mobile Number</p>
                                            <p className="font-medium text-gray-900">
                                                {commentData.mobileNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Mail className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-medium text-gray-900 break-all">
                                                {commentData.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`px-4 py-2 rounded-full font-semibold ${commentData.status?.toLowerCase() === "show"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {commentData.status}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Review Summary Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                    >
                        <div className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-white" />
                                <h3 className="text-lg font-bold text-white">
                                    Review Summary
                                </h3>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Rating Section */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                        Rating
                                    </p>
                                    <p className="text-gray-500 text-sm">Based on user experience</p>
                                </div>
                                {renderStars(commentData.rating)}
                            </div>

                            {/* Comment Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MessageSquare className="w-4 h-4" />
                                    <p className="font-semibold">User Comment</p>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                                >
                                    <p className="text-gray-700 leading-relaxed">
                                        "{commentData.comment}"
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                    >
                        <Button
                            text="Back"
                            variant={2}
                            onClick={handleBack}
                            className="px-8 py-3"
                        />
                        <Button
                            text={loading ? "Updating..." : commentData.status?.toLowerCase() === "show" ? "Hide Review" : "Show Review"}
                            variant={1}
                            onClick={handleHide}
                            disabled={loading}
                            icon={commentData.status?.toLowerCase() === "show" ?
                                <EyeOff className="w-4 h-4" /> :
                                <Eye className="w-4 h-4" />
                            }
                            className="px-8 py-3"
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
}