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
 
    console.log("adminProfile", adminProfile)
    return (
        <div className="w-full">
            <BreadCrumb linkText={[{ text: "My Profile" }]} />

            <div className="min-h-screen flex flex-col w-full">
                <PagePath2 title="Profile Details" />

               <div className="bg-white rounded-2xl shadow-xl p-6">

      {loading ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          {/* -------- PROFILE HEADER -------- */}
          <div className="flex flex-col items-center text-center">
            <img
              src={adminProfile?.profileImage || profile}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-md border-4 border-white object-cover"
            />

            {/* <h2 className="mt-4 text-2xl font-semibold text-[#0A051F]">
              {adminProfile?.name || "Admin"}
            </h2> */}

            {/* <p className="text-gray-500 text-sm">
              {adminProfile?.email}
            </p> */}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* -------- PROFILE INFO GRID -------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#004AAD]">Full Name</span>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                {adminProfile?.name || "-"}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#004AAD]">Phone Number</span>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                {adminProfile?.phone || "-"}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#004AAD]">Email Address</span>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                {adminProfile?.email || "-"}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#004AAD]">Password</span>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                ********
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* -------- BUTTONS -------- */}
          <div className="flex justify-center gap-6">
            <Button
              variant={2}
              text="Cancel"
              onClick={() => navigate("/dashboard")}
            />
            <Button
              variant={1}
              text="Edit Profile"
              onClick={() => navigate("/adminProfile/editProfile")}
            />
          </div>
        </>
      )}
    </div>
            </div>
        </div>
    )
}

export default AdminProfile
