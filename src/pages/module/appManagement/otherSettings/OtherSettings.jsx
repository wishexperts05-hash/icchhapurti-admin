import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import useOtherSettings from "../../../../hooks/appManagement/useOtherSettings";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

function OtherSettings() {
  const navigate = useNavigate();
  const {
    loading,
    otherSettings,
    fetchOtherSettings,
    updateOtherSettings,
    resetOtherSettings,
  } = useOtherSettings();

  useEffect(() => {
    fetchOtherSettings();

    return () => {
      resetOtherSettings();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values) => {
    const settingsData = {
      showTrustedUsersOnStaffApp: values.showTrustedUsersStaff,
      showTrustedUsersOnUserApp: values.showTrustedUsersUser,
      showRatingAndBestSellerOnStaffApp: values.showRatingStaff,
      showRatingAndBestSellerOnUserApp: values.showRatingUser,
      ticketEarnForStaff: values.ticketEarnStaff,
      ticketEarnForUser: values.ticketEarnUser,
    };

    const result = await updateOtherSettings(settingsData);
    if (result) {
      // Optionally refetch to get updated data
      await fetchOtherSettings();
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
  };

  if (loading && !otherSettings) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management", href: "/app-management" },
          { text: "Other Settings" },
        ]}
      />

      <PagePath2 title="Other Settings" />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            showTrustedUsersStaff:
              otherSettings?.showTrustedUsersOnStaffApp ?? false,
            showTrustedUsersUser:
              otherSettings?.showTrustedUsersOnUserApp ?? false,
            showRatingStaff:
              otherSettings?.showRatingAndBestSellerOnStaffApp ?? false,
            showRatingUser:
              otherSettings?.showRatingAndBestSellerOnUserApp ?? false,
            ticketEarnStaff: otherSettings?.ticketEarnForStaff ?? false,
            ticketEarnUser: otherSettings?.ticketEarnForUser ?? false,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form className="flex flex-col gap-8">
              {/* Total Trusted Users Section */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Total Trusted Users
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Show Trusted Users On Staff App
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.showTrustedUsersStaff}
                        onChange={(e) =>
                          setFieldValue(
                            "showTrustedUsersStaff",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Show Trusted Users On User App
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.showTrustedUsersUser}
                        onChange={(e) =>
                          setFieldValue(
                            "showTrustedUsersUser",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Rating & BestSeller Visibility Section */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Rating & BestSeller Visibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Show Rating & BestSeller On Staff App
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.showRatingStaff}
                        onChange={(e) =>
                          setFieldValue("showRatingStaff", e.target.checked)
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Show Rating & BestSeller On User App
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.showRatingUser}
                        onChange={(e) =>
                          setFieldValue("showRatingUser", e.target.checked)
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Ticket Earning Settings Section */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Ticket Earning Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Ticket Earn For Staff
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.ticketEarnStaff}
                        onChange={(e) =>
                          setFieldValue("ticketEarnStaff", e.target.checked)
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <span className="text-sm font-medium text-gray-700">
                      Ticket Earn For User
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.ticketEarnUser}
                        onChange={(e) =>
                          setFieldValue("ticketEarnUser", e.target.checked)
                        }
                        className="sr-only peer"
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-5 gap-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() => handleCancel(resetForm)}
                  disabled={loading}
                />
                <Button
                  variant={1}
                  text={loading ? "Saving..." : "Save"}
                  type="submit"
                  disabled={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OtherSettings;