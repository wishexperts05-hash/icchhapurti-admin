import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import Button from "../../../../components/uiComponent/Button";

const StaffMapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const staffTravel = {
    loginTime: "10:00 AM",
    logoutTime: "8:00 PM",
    loginLocation: "Viman Nagar",
    startPoint: "Viman Nagar",
    endPoint: "Pune",
    travelMode: "Public Transport",
    distance: "45 km",
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };



 {/* API UPDATE PENDING HERE (BACKEND) */}
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Staff Management", href: "/staff-management" },
          { text: "Attendance List", href: "/staff-management/attendanceListing" },
          { text: "Map View" },
        ]}
      />

      <PagePath2 title={"Map View"} />


      {/* Page Layout */}
      <div className="flex flex-col gap-6">
        {/* Travel Info Section */}
        <div className="w-full bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <MapPin className="text-yellow-600" size={20} />
            Travel Information
          </h3>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DetailsField label="Login Time" value={staffTravel.loginTime} />
            <DetailsField label="Logout Time" value={staffTravel.logoutTime} />
          </div>

          <div className="gap-2 mb-4">
            <DetailsField label="Login Location" value={staffTravel.loginLocation} />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DetailsField label="Start Point" value={staffTravel.startPoint} />
            <DetailsField label="End Point" value={staffTravel.endPoint} />
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Travel Mode</label>
              <div className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 flex items-center gap-2">
                {staffTravel.travelMode}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Distance Covered</label>
              <div className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 flex items-center gap-2">
                {staffTravel.distance}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex-1 bg-white shadow rounded-xl overflow-hidden">
          <iframe
            title="staff-route-map"
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d7555.645926764968!2d73.88484567392264!3d18.55287980000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d18.5528798!2d73.8848457!4m3!3m2!1d18.5204303!2d73.8567437!4m3!3m2!1d18.5148619!2d73.9331453!5e0!3m2!1sen!2sin!4v1690976538824!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-5">
        <Button
          text="Back"
          variant={2}
          onClick={handleBack}
        />
      </div>
    </div>
  );
};

export default StaffMapPage;
