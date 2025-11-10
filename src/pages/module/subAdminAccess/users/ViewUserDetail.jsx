import React, { useEffect } from "react";
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
  UserCheck,
} from "lucide-react";

const ViewUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, fetchUserDetails, usersDetail, updateUserStatus } =
    useUsers();

  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  const handleCancel = () => {
    navigate("/sub-admin/users");
  };

  const handleToggleStatus = () => {
    updateUserStatus(id);
  };

  const handleEdit = () => {
    navigate(`/sub-admin/users/edit/${id}`);
  };

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Sub Admin Access" },
          { text: "Users", href: "/sub-admin/users" },
          { text: "View User Details" },
        ]}
      />
      <PagePath2 title="View User Details" />

      <div className="container mx-auto  rounded-3xl shadow-2xl">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400 text-lg">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="bg-white border border-sky-200 p-9  w-full rounded-xl"> 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* User Header */}
            <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-500 to-orange-400 p-10 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500 relative">
              {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-30 rounded-xl"></div> */}
              <div className="relative z-10">
                <img
                  src={usersDetail?.photo || "/default-avatar.png"}
                  alt="User"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-500 transform hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-2 bg-indigo-600 text-white text-xs font-semibold rounded-tl-lg">
                  Status: {usersDetail?.isActive ? "Active" : "Blocked"}
                </div>
              </div>
              <h2 className="mt-4 text-4xl font-bold text-white tracking-wider">
                {usersDetail?.firstName} {usersDetail?.lastName}
              </h2>
            </div>

            {/* User Details Grid */}
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-12 text-white">
              {/* Role */}
              <div className="flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-300 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
                <UserCheck className="text-slate-100 text-3xl" />
                <div>
                  <p className="text-xs  text-slate-100">Role</p>
                  <p className="text-xl  text-slate-100 font-semibold">{usersDetail?.role}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-300 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
                <Mail className="text-slate-100 text-3xl" />
                <div>
                  <p className="text-xs ext-slate-100">Email</p>
                  <p className="text-xl font-semibold">{usersDetail?.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-300 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
                <Phone className="text-slate-100 text-3xl" />
                <div>
                  <p className="text-xs text-slate-100">Phone Number</p>
                  <p className="text-xl font-semibold">
                    {usersDetail?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-1 lg:col-span-3 flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
              <Button
                type="button"
                text="Cancel"
                variant={2}
                onClick={handleCancel}
                className="transition-transform transform hover:scale-110 bg-gray-600 text-white rounded-xl py-3 px-6 shadow-xl hover:bg-gray-700 focus:ring-4 focus:ring-gray-500"
              />
              <Button
                type="button"
                text={usersDetail?.isActive ? "Block" : "Activate"}
                variant={usersDetail?.isActive ? 4 : 3}
                onClick={handleToggleStatus}
                className="transition-transform transform hover:scale-110 bg-indigo-600 text-white rounded-xl py-3 px-6 shadow-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500"
              />
              <Button
                type="button"
                text="Edit"
                variant={1}
                onClick={handleEdit}
                icon={<Edit size={18} />}
                className="transition-transform transform hover:scale-110 bg-blue-600 text-white rounded-xl py-3 px-6 shadow-xl flex items-center space-x-2 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
              />
            </div>
            
          </div>
          </div>
         
        )}
      </div>
    </div>
  );
};

export default ViewUserDetail;
