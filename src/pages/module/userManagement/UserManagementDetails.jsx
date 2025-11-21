import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../components/uiComponent/DetailsField";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from '../../../components/uiComponent/Button';
import useUserManagement from '../../../hooks/userManagement/useUserManagement';

export default function UserDetails() {
    const { loading, userDetail, fetchUserDetails } = useUserManagement();
    const navigate = useNavigate();
    const { id } = useParams();

    console.log("userDetail:", userDetail);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (id) {
            fetchUserDetails(id);
        }
    }, [id]);

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "User Management", href: "/user-management" },
                        { text: "View User" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="User Details"
                />

                {/* User Profile Card */}
                <div className="bg-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={userDetail?.user?.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{userDetail?.user?.name}</h2>
                            <p className="text-gray-600 text-base">{userDetail?.user?.address || "-"}</p>
                        </div>
                    </div>
                </div>

                {/* User Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <FaRegUser className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">User Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Name"
                                value={userDetail?.user?.name}
                            />

                            <DetailsField
                                label="E-Mail Id"
                                value={userDetail?.user?.email}
                                type="email"
                            />

                            <DetailsField
                                label="Phone Number"
                                value={userDetail?.user?.phoneNumber}
                                type="tel"
                            />

                            <DetailsField
                                label="DOB"
                                value={userDetail?.user?.dob}
                            />

                            <DetailsField
                                label="Address"
                                value={userDetail?.user?.address || "-"}
                                className="md:col-span-2"
                            />

                            <DetailsField
                                label="Referral Name"
                                value={userDetail?.user?.referralCodeUsed || "-"}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <MdAccountBalance className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Bank Name"
                                value={userDetail?.user?.bankDetails?.bankName || "-"}
                            />

                            <DetailsField
                                label="Bank Account Number"
                                value={userDetail?.user?.bankDetails?.accountNumber || "-"}
                            />

                            <DetailsField
                                label="IFSC Code"
                                value={userDetail?.user?.bankDetails?.ifscCode || "-"}
                            />

                            <DetailsField
                                label="Account Holder Name"
                                value={userDetail?.user?.bankDetails?.accountHolderName || "-"}
                            />
                        </div>
                    </div>
                </div>

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
                                value={userDetail?.wallet?.balance}
                                type="number"
                            />

                            <DetailsField
                                label="Coins"
                                value={userDetail?.wallet?.coins}
                            // type="number"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-8 mt-8 mb-8 ">
                    <Button
                        text="Back"
                        variant={1}
                        onClick={handleBack}
                    />

                </div>
            </div>
        </div>
    );
}