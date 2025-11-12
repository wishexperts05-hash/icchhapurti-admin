import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

export default function UserDetails() {
    
    return (
        <div className="min-h-screen bg-gray-50 p-8 bg-white mb-2">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "User Management", href: "/user-management" },
                        { text: "View User" },
                    ]}
                />

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">User Details</h1>

                <hr className="border-t-2 border-gray-300 mb-8" />

                {/* User Profile Card */}
                <div className="bg-gray-100 rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1"></h2>
                            <p className="text-gray-600 text-base">Maharashtra, India</p>
                        </div>
                    </div>
                </div>

                {/* User Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 ">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-500 ">
                        <div className="flex items-center gap-3">
                            <FaRegUser className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">User Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50">
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">Name :</div>
                                <div className="flex-1 text-gray-800"> Dheejraj jhadhav</div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">E-Mail Id :</div>
                                <div className="flex-1 text-gray-800">
                                    ayushi@gmail.com
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">Phone Number :</div>
                                <div className="flex-1 text-gray-800">6578942036</div>
                            </div>

                            {/* DOB */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">DOB :</div>
                                <div className="flex-1 text-gray-800">05/02/1999</div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">Address :</div>
                                <div className="flex-1 text-gray-800">Maharashtra, India</div>
                            </div>
                               {/* Referral Name */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">Referral Name :</div>
                                <div className="flex-1 text-gray-800">Jeo Deo</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-500 px-2">
                        <div className="flex items-center gap-3">
                            <LuWallet className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">wallet</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50">
                        <div className="space-y-6">
                            {/* current */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">current  wallet balance :</div>
                                <div className="flex-1 text-gray-800">677</div>
                            </div>

                            {/* coins */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">coins :</div>
                                <div className="flex-1 text-gray-800">
                                    465768
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}