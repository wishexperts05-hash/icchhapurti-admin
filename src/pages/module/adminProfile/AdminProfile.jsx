import React, { useEffect } from 'react'
import BreadCrumb from '../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../components/uiComponent/PagePath2'
import profile from "../../../assets/user.png"
import Button from '../../../components/uiComponent/Button'
import { useNavigate } from 'react-router-dom'
import useAdminProfile from '../../../hooks/auth/useAdminProfile'
import LoaderSpinner from '../../../components/uiComponent/LoaderSpinner'

const AdminProfile = () => {
    const navigate = useNavigate();
    const { loading, fetchAdminProfile, adminProfile } = useAdminProfile();
    const adminId = sessionStorage.getItem("adminId");

    useEffect(() => {
        if (adminId)
            fetchAdminProfile(adminId);
    }, [])

    return (
        <div className="w-full">
            <BreadCrumb linkText={[{ text: "My Profile" }]} />

            <div className="min-h-screen flex flex-col w-full">
                <PagePath2 title="Profile Details" />

                {/* Card container */}
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                    {
                        loading ? (
                            <div className='flex w-full items-center justify-center'>
                                <LoaderSpinner />
                            </div>
                        ) : (
                            <>
                                {/* Header Section */}
                                <div className="flex flex-col items-center gap-4">
                                    <img
                                        src={adminProfile?.admin?.profileImage || profile}
                                        alt="Admin Profile"
                                        className="w-64 h-64 rounded-full shadow-md border-4 border-gray-100"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-gray-200"></div>

                                {/* Info Section */}
                                <div className="flex flex-col gap-6 text-gray-700 py-4">
                                    <div className="flex flex-col gap-2 w-full">
                                        <span className="font-medium text-[#004AAD]">Full Name</span>
                                        <div className="px-3 py-3 border border-[#CCA547]/80 rounded-lg shadow-sm w-full">
                                            {adminProfile?.admin?.fullName || "-"}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <span className="font-medium text-[#004AAD]">Phone Number</span>
                                        <div className="px-3 py-3 border border-[#CCA547]/80 rounded-lg shadow-sm w-full">
                                            {adminProfile?.admin?.phoneNumber || "-"}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <span className="font-medium text-[#004AAD]">Email Address</span>
                                        <div className="px-3 py-3 border border-[#CCA547]/80 rounded-lg shadow-sm w-full">
                                            {adminProfile?.admin?.email || "-"}
                                        </div>
                                    </div>
                                     <div className="flex flex-col gap-2 w-full">
                                        <span className="font-medium text-[#004AAD]">Password</span>
                                        <div className="px-3 py-3 border border-[#CCA547]/80 rounded-lg shadow-sm w-full">
                                            {adminProfile?.admin?.password || "-"}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-gray-200"></div>

                                {/* Buttons */}
                                <div className='py-6 flex items-center justify-center w-full gap-6'>
                                    <Button variant={2} text='Cancel' onClick={() => navigate('/dashboard')} />
                                    <Button variant={1} text='Edit Profile' onClick={() => navigate('/adminProfile/editProfile')} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
