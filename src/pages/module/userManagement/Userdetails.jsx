import React from 'react';
import { User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user; // User data is retrieved from state

    // If no user data, redirect back
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No User Data Found</h2>
                    <button
                        onClick={() => navigate('/dashboard')} // IMPORTANT CHANGE: Use /dashboard for UserManagement
                        className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
                    >
                        Back to User Management
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 bg-white mb-2">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 text-sm mb-6">
                    <div className="w-6 h-6 bg-black flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                        </div>
                    </div>
                    <span className="text-gray-400">›</span>
                    <button
                        onClick={() => navigate('/dashboard')} // IMPORTANT CHANGE: Use /dashboard for UserManagement
                        className="text-gray-700 hover:text-blue-500"
                    >
                        User Management
                    </button>
                    <span className="text-gray-400">›</span>
                    <span className="text-blue-500 font-medium">View User</span>
                </div>

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
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.userName}</h2>
                            <p className="text-gray-600 text-base">Maharashtra, India</p>
                        </div>
                    </div>
                </div>

                {/* User Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 ">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 ">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">User Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50">
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">Name :</div>
                                <div className="flex-1 text-gray-800">{user.userName}</div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">E-Mail Id :</div>
                                <div className="flex-1 text-gray-800">
                                    {user.email === "example@gmail.com"
                                        ? (user.id === 1 ? `Dheeraj@gmail.com` : `user${user.id}@gmail.com`) // Added a simple logic for unique email
                                        : user.email}
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
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">wallet</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50">
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">current  wallet balance :</div>
                                <div className="flex-1 text-gray-800">{user.userName}</div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <div className="w-56 font-bold text-gray-900">coins :</div>
                                <div className="flex-1 text-gray-800">
                                    {user.email === "example@gmail.com"
                                        ? (user.id === 1 ? `8` : `9`) // Added a simple logic for unique email
                                        : user.email}
                                </div>
                            </div>

                        
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}