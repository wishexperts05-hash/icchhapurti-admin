import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useUsers from "../../../../hooks/subAdminAccess/useUsers";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import Button from "../../../../components/uiComponent/Button";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Edit,
  ArrowLeft,
  Check,
} from "lucide-react";

const ViewUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, fetchUserDetails, usersDetail, updateUserStatus } =
    useUsers();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    try {
      await updateUserStatus(id);
      setTimeout(() => setIsUpdating(false), 500);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    navigate(`/sub-admin/users/edit/${id}`);
  };

  return (
    <div className="w-full">
      <BreadCrumb
        linkText={[
          { text: "Sub Admin Access" },
          { text: "Users", href: "/sub-admin/users" },
          { text: "View User Details" },
        ]}
      />
      <PagePath2 title="View User Details" />

      <div className=" mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <LoaderSpinner />
            <p className="mt-4 text-gray-600">Loading user details...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-400 to-purple-300 p-3 md:p-4">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-40"></div>
                  <img
                    src={usersDetail?.photo || "/default-avatar.png"}
                    alt="User"
                    className="relative w-14 h-14 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                </div>

                {/* User Info */}
                <div className="text-center md:text-left text-white">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    {usersDetail?.firstName} {usersDetail?.lastName}
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <div className={`px-3 py-1 rounded-full font-medium ${usersDetail?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {usersDetail?.isActive ? 'Active' : 'Blocked'}
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                     {/* <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                     <p className="text-sm text-gray-600 mb-1">Role</p> */}
                      {usersDetail?.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Personal Details */}
                <div className="space-y-6">

                  {/* Email Card */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="text-lg font-semibold text-gray-900 truncate">{usersDetail?.email}</p>
                        <div className="mt-2">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${usersDetail?.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {usersDetail?.isEmailVerified ? (
                              <>
                                <Check className="w-3 h-3" />
                                Verified
                              </>
                            ) : (
                              "Pending Verification"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Timeline */}
                <div className="space-y-6">
                  {/* Phone Card */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                        <p className="text-lg font-semibold text-gray-900">{usersDetail?.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    type="button"
                    text="Back"
                    variant={2}
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 rounded-lg transition-all hover:shadow-md"
                  />
                  <Button
                    type="button"
                    text={usersDetail?.isActive ? "Block User" : "Activate User"}
                    variant={usersDetail?.isActive ? 4 : 3}
                    onClick={handleToggleStatus}
                    disabled={isUpdating}
                    icon={isUpdating ? null : usersDetail?.isActive ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    className="px-5 py-2.5 rounded-lg transition-all hover:shadow-md"
                  />
                  <Button
                    type="button"
                    text="Edit User"
                    variant={1}
                    onClick={handleEdit}
                    // icon={<Edit size={18} />}
                    className="px-5 py-2.5 rounded-lg transition-all hover:shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserDetail;