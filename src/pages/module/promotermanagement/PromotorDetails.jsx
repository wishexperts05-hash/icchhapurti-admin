import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../components/uiComponent/DetailsField";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from '../../../components/uiComponent/Button';
import { Camera } from "lucide-react";

export default function PromoterDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const promoterData = location.state?.promoterData;

    // Default data 
    const promoter = promoterData || {
        name: "Jane Cooper",
        code: "C001",
        phone: "9876543210",
        email: "janecooper01@gmail.com",
        referral: "HVSGU45789",
        total: 50,
        status: true,
        countryCode: "+91",
        dob: "01/01/1990",
        country: "India",
        state: "Maharashtra",
        city: "Nagpur",
        bankName: "State Bank Of India",
        accountNumber: "654971879431",
        ifsc: "SBIN0001234",
        accountType: "Savings",
        accountHolderName: "Jane Cooper",
        walletBalance: "677",
        coins: "465768",
        profileImage: null,
    };

    const handleBack = () => {
        navigate("/promoter-management");
    };

    const handleEdit = () => {
        navigate("/promoter-management/promoter-managementedit", { state: { promoterData: promoter } });
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "Promotor management", href: "/promoter-management" },
                        { text: "Promotor Details" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="Promotor Details"
                />

                {/* Promoter Profile Card */}
                <div className="bg-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                            {promoter.profileImage ? (
                                <img 
                                    src={promoter.profileImage} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="text-gray-400">
                                    <Camera className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{promoter.name}</h2>
                            <p className="text-gray-600 text-base">{promoter.state}, {promoter.country}</p>
                            <div className="mt-2">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                    promoter.status 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {promoter.status ? "Active" : "Blocked"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <FaRegUser className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Full Name"
                                value={promoter.name}
                            />

                            <DetailsField
                                label="E-Mail Id"
                                value={promoter.email}
                                type="email"
                            />

                            <DetailsField
                                label="Phone Number"
                                value={`${promoter.countryCode || "+91"} ${promoter.phone}`}
                                type="tel"
                            />

                            <DetailsField
                                label="Date of Birth"
                                value={promoter.dob}
                            />

                            <DetailsField
                                label="Country"
                                value={promoter.country}
                            />

                            <DetailsField
                                label="State"
                                value={promoter.state}
                            />

                            <DetailsField
                                label="City"
                                value={promoter.city}
                            />

                            <DetailsField
                                label="Referral Code"
                                value={promoter.referral}
                            />
                        </div>
                    </div>
                </div>

                {/* Statistics Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <FaRegUser className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Statistics</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Total Users Registered"
                                value={promoter.total?.toString()}
                            />

                            <DetailsField
                                label="Promoter Code"
                                value={promoter.code}
                            />

                            <DetailsField
                                label="Status"
                                value={promoter.status ? "Active" : "Blocked"}
                            />
                        </div>
                    </div>
                </div>

                {/* Bank Details Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <MdAccountBalance className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Bank Details</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Bank Name"
                                value={promoter.bankName}
                            />

                            <DetailsField
                                label="Account Number"
                                value={promoter.accountNumber}
                            />

                            <DetailsField
                                label="IFSC Code"
                                value={promoter.ifsc}
                            />

                            <DetailsField
                                label="Account Type"
                                value={promoter.accountType}
                            />

                            <DetailsField
                                label="Account Holder Name"
                                value={promoter.accountHolderName}
                            />
                        </div>
                    </div>
                </div>

                {/* Wallet Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <LuWallet className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Wallet</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Current Wallet Balance"
                                value={promoter.walletBalance || "0"}
                                type="number"
                            />

                            <DetailsField
                                label="Coins"
                                value={promoter.coins || "0"}
                                type="number"
                            />
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
                        text="Edit"
                        variant={2}
                        onClick={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
}