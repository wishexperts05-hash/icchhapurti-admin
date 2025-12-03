import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../components/uiComponent/DetailsField";
import {
    MdLocalOffer,
    MdDateRange,
    MdInfo,
    MdShoppingCart,
    MdCardGiftcard,
    MdPeople,
    MdCheckCircle,
    MdCancel
} from "react-icons/md";
import { FaGift } from "react-icons/fa"; // Using FaGift instead of GiGift
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from '../../../components/uiComponent/Button';
import useOfferManagement from "../../../hooks/offerManagement/useOfferManagement";
import LoaderSpinner from '../../../components/uiComponent/LoaderSpinner';

export default function OfferManagementView() {
    const { id } = useParams();
    const { loading, offerDetail, fetchOfferDetails } = useOfferManagement();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOfferDetails(id);
    }, [id]);

    console.log("offerDetail:", offerDetail);

    const handleBack = () => {
        navigate("/offer-management");
    };

    const handleEdit = () => {
        navigate(`/offer-management/edit/${id}`);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return dateString.split('/').join('-');
    };

    // Get status badge color
    const getStatusBadge = (isActive) => {
        if (isActive) {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <MdCheckCircle className="w-3 h-3 mr-1" />
                    Active
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <MdCancel className="w-3 h-3 mr-1" />
                Inactive
            </span>
        );
    };

    // Get audience badge
    const getAudienceBadge = (audience) => {
        let bgColor = 'bg-blue-100 text-blue-800';
        if (audience === 'PREMIUM') bgColor = 'bg-purple-100 text-purple-800';
        if (audience === 'NEW') bgColor = 'bg-green-100 text-green-800';

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}>
                <MdPeople className="w-3 h-3 mr-1" />
                {audience || 'ALL'}
            </span>
        );
    };

    // Get offer type badge
    const getOfferTypeBadge = (type) => {
        let icon = MdLocalOffer;
        let bgColor = 'bg-indigo-100 text-indigo-800';

        if (type === 'BUY_GET') {
            icon = FaGift;
            bgColor = 'bg-teal-100 text-teal-800';
        }

        const Icon = icon;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}>
                <Icon className="w-3 h-3 mr-1" />
                {type || 'Offer'}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <BreadCrumb
                linkText={[
                    { text: "Offer Management", href: "/offer-management" },
                    { text: "View Offer" },
                ]}
            />
            <PagePath2 title="View Offer" />

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                {loading ? (
                    <div className="flex w-full items-center justify-center py-20">
                        <LoaderSpinner />
                    </div>
                ) : offerDetail ? (
                    <>
                        {/* Card Header with Status */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                        <MdLocalOffer className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {offerDetail.title || 'No Title'}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {getStatusBadge(offerDetail.isActive)}
                                            {getOfferTypeBadge(offerDetail.offerType)}
                                            {getAudienceBadge(offerDetail.targetAudience)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MdDateRange className="w-4 h-4" />
                                    <span className="font-medium">Valid: {formatDate(offerDetail.startDate)} - {formatDate(offerDetail.endDate)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Offer Details */}
                        <div className="p-6 md:p-8">
                            {/* Main Offer Info */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <MdInfo className="w-5 h-5 text-blue-600" />
                                    Basic Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailsField
                                        label="Offer Title"
                                        value={offerDetail.title || 'N/A'}
                                        icon={<MdLocalOffer className="w-4 h-4 text-gray-400" />}
                                    />
                                    <DetailsField
                                        label="Offer Type"
                                        value={
                                            <div className="flex items-center gap-2">
                                                {getOfferTypeBadge(offerDetail.offerType)}
                                                <span className="text-gray-700">
                                                    {offerDetail.offerType === 'BUY_GET' ? 'Buy X Get Y Free' : 'Special Offer'}
                                                </span>
                                            </div>
                                        }
                                    />
                                    <DetailsField
                                        label="Target Audience"
                                        value={getAudienceBadge(offerDetail.targetAudience)}
                                    />
                                    <DetailsField
                                        label="Status"
                                        value={getStatusBadge(offerDetail.isActive)}
                                    />
                                    <DetailsField
                                        label="Start Date"
                                        value={formatDate(offerDetail.startDate)}
                                        icon={<MdDateRange className="w-4 h-4 text-gray-400" />}
                                    />
                                    <DetailsField
                                        label="End Date"
                                        value={formatDate(offerDetail.endDate)}
                                        icon={<MdDateRange className="w-4 h-4 text-gray-400" />}
                                    />
                                </div>
                            </div>

                            {/* Buy & Get Details - Only show if it's a BUY_GET offer */}
                            {offerDetail.offerType === 'BUY_GET' && offerDetail.buyGet && (
                                <div className="mb-8 pt-6 border-t border-gray-100">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaGift className="w-5 h-5 text-teal-600" />
                                        Buy & Get Details
                                    </h4>
                                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 mb-3">
                                                    <MdShoppingCart className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <h5 className="font-semibold text-gray-900">Buy Quantity</h5>
                                                <p className="text-2xl font-bold text-blue-700 mt-1">
                                                    {offerDetail.buyGet.buyQty || '0'}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">Items to Purchase</p>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-md mb-3">
                                                        <FaGift className="w-6 h-6 text-white" />
                                                    </div>
                                                    <p className="text-lg font-bold text-gray-700">GET</p>
                                                    <p className="text-sm text-gray-600">Free Items</p>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 mb-3">
                                                    <MdCardGiftcard className="w-6 h-6 text-teal-600" />
                                                </div>
                                                <h5 className="font-semibold text-gray-900">Get Quantity</h5>
                                                <p className="text-2xl font-bold text-teal-700 mt-1">
                                                    {offerDetail.buyGet.getQty || '0'}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">Free Items</p>
                                            </div>
                                        </div>

                                        {/* Product Information */}
                                        <div className="mt-8 pt-6 border-t border-teal-100">
                                                <DetailsField
                                                    label="Product"
                                                    value={offerDetail.buyGet.productName || 'N/A'}
                                                />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 py-5 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    text="Back to Offers"
                                    variant={2}
                                    onClick={handleBack}
                                    className="w-full sm:w-auto"
                                />
                                <Button
                                    text="Edit Offer"
                                    variant={1}
                                    onClick={handleEdit}
                                    className="w-full sm:w-auto"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <MdLocalOffer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Offer Not Found</h3>
                        <p className="text-gray-500 mb-6">The requested offer could not be loaded.</p>
                        <Button
                            text="Go Back"
                            variant={2}
                            onClick={handleBack}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}