import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { Box } from "@mui/material";
import Button from "../../../../components/uiComponent/Button";
import useAboutUs from "../../../../hooks/appManagement/useAboutUs";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const AboutUS = () => {
  const navigate = useNavigate();
  const { loading, aboutUs, fetchAboutUs, resetAboutUs } = useAboutUs();

  useEffect(() => {
    fetchAboutUs();

    return () => {
      resetAboutUs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    navigate("/app-management/aboutus/edit");
  };

  if (loading && !aboutUs) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <Box>
      <BreadCrumb
        linkText={[{ text: "App Management" }, { text: "About Us" }]}
      />
      <PagePath2 title="About Us" />

      <div className="bg-white p-8 mb-6 rounded-2xl shadow-lg">
        {/* Hero Section */}
        {aboutUs?.heroSection && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              {/* Left: Title and Large Image */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {aboutUs.heroSection.title}
                </h1>
                {aboutUs.heroSection.photos && aboutUs.heroSection.photos[0] && (
                  <img
                    src={aboutUs.heroSection.photos[0]}
                    alt="Hero Main"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* Right: Two Small Images and Description */}
              <div>
                {aboutUs.heroSection.photos && aboutUs.heroSection.photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {aboutUs.heroSection.photos.slice(1, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Hero ${index + 2}`}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {aboutUs.heroSection.description}
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            {aboutUs?.statistics && (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-1">
                      {aboutUs.statistics.sellingProducts}+
                    </h2>
                    <p className="text-sm text-gray-600">Selling Products</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-1">
                      {aboutUs.statistics.satisfiedCustomers}+
                    </h2>
                    <p className="text-sm text-gray-600">Satisfied Customers</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-1">
                      {aboutUs.statistics.worldwideHonors}+
                    </h2>
                    <p className="text-sm text-gray-600">Worldwide Honors</p>
                  </div>
                </div>

                {/* Customer Rating */}
                {aboutUs?.customerRating && (
                  <div className="flex items-center justify-start gap-4 mt-4">
                    <div className="flex -space-x-2">
                      {/* Sample customer avatars - you can replace with actual data if available */}
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      4.8 Customers Ratings
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Our Mission */}
        {aboutUs?.ourMission && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {aboutUs.ourMission.description}
                </p>
              </div>

              {/* Right: Images */}
              {aboutUs.ourMission.photos && aboutUs.ourMission.photos.length > 0 && (
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    {aboutUs.ourMission.photos.slice(0, 2).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Mission ${index + 1}`}
                        className={`w-full object-cover rounded-lg shadow-md ${
                          index === 0 ? "h-64" : "h-48"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Our Vision */}
        {aboutUs?.ourVision && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Images */}
              {aboutUs.ourVision.photos && aboutUs.ourVision.photos.length > 0 && (
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    {aboutUs.ourVision.photos.slice(0, 2).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Vision ${index + 1}`}
                        className={`w-full object-cover rounded-lg shadow-md ${
                          index === 0 ? "h-48" : "h-64"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Right: Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {aboutUs.ourVision.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Our Team */}
        {aboutUs?.ourTeam && aboutUs.ourTeam.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutUs.ourTeam.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg text-center"
                >
                  {/* Member Photo */}
                  {member.photos && member.photos.length > 0 ? (
                    <img
                      src={member.photos[0]}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4" />
                  )}

                  {/* Member Info */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Button */}
        <div className="flex justify-center mt-8">
          <Button text="Edit" variant={1} onClick={handleEdit} />
        </div>
      </div>
    </Box>
  );
};

export default AboutUS;

