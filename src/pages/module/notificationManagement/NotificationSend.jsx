import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useNotificationManagement from "../../../hooks/notificationManagement/useNotificationManagement";
import { ChevronDown, X } from "lucide-react";
import useDropdown from "../../../hooks/dropdown/useDropdown";

const SendNotification = () => {
  const navigate = useNavigate();
  const [targetAudience, setTargetAudience] = useState("selectUsers");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const formikRef = useRef(null);

  const { 
    loading, 
    sendNotification
  } = useNotificationManagement();

  // Use dropdown hook for countries
  const { 
    countries, 
    countryLoading, 
    fetchCountryDropdown 
  } = useDropdown();

  // User type options for multi-select
  const userTypeOptions = [
    { value: "all", label: "All Users" },
    { value: "User", label: "User" },
    { value: "Staff", label: "Staff" },
    { value: "Promoter", label: "Promoter" },
  ];

  
  useEffect(() => {
    fetchCountryDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Convert countries to options format
  const countryOptions = Array.isArray(countries) ? countries.map((country) => ({
    value: country._id || country.id || country.name,
    label: country.name,
  })) : [];

  const resetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
      setTargetAudience("selectUsers");
      setSelectedUsers([]);
      setIsDropdownOpen(false);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Notification title is required")
      .max(100, "Title must be less than 100 characters"),
    message: Yup.string()
      .required("Message is required")
      .max(500, "Message must be less than 500 characters"),
    targetCountry: Yup.string().when("targetAudience", {
      is: "specificCountry",
      then: (schema) => schema.required("Country is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    targetAudience: Yup.string().required("Target audience type is required"),
    selectedUsers: Yup.array().when("targetAudience", {
      is: "selectUsers",
      then: (schema) => schema.min(1, "Select at least one user type").required("User selection is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleTargetAudienceChange = (value, setFieldValue) => {
    setTargetAudience(value);
    setFieldValue("targetAudience", value);
  };

  const handleUserSelectionToggle = (userValue, setFieldValue, currentSelection) => {
    let newSelection;

    if (userValue === "all") {
      newSelection = currentSelection.includes("all") ? [] : ["all"];
    } else {
      const filteredSelection = currentSelection.filter((val) => val !== "all");
      
      if (filteredSelection.includes(userValue)) {
        newSelection = filteredSelection.filter((val) => val !== userValue);
      } else {
        newSelection = [...filteredSelection, userValue];
      }
    }

    setSelectedUsers(newSelection);
    setFieldValue("selectedUsers", newSelection);
  };

  const getSelectedUsersDisplay = (selectedUsers) => {
    if (!selectedUsers || selectedUsers.length === 0) return "Select user types";
    if (selectedUsers.includes("all")) return "All Users";
    
    const labels = selectedUsers.map(val => {
      const option = userTypeOptions.find(opt => opt.value === val);
      return option ? option.label : val;
    });
    
    return labels.join(", ");
  };

  const removeUserSelection = (userValue, setFieldValue, currentSelection) => {
    const newSelection = currentSelection.filter(val => val !== userValue);
    setSelectedUsers(newSelection);
    setFieldValue("selectedUsers", newSelection);
  };

  const getSelectedUsersLabels = (selectedUsers) => {
    if (!selectedUsers || selectedUsers.length === 0) return [];
    
    return selectedUsers.map(val => {
      const option = userTypeOptions.find(opt => opt.value === val);
      return { value: val, label: option ? option.label : val };
    });
  };

  const handleSubmit = async (values) => {
    let payload = {
      title: values.title,
      message: values.message,
      targetAudience: [],
      targetCountry: "all",
    };

    if (values.targetAudience === "selectUsers") {
      if (values.selectedUsers.includes("all")) {
        payload.targetAudience = ["User", "all"];
        payload.targetCountry = "all";
      } else {
        payload.targetAudience = values.selectedUsers;
        payload.targetCountry = "all";
      }
    } else if (values.targetAudience === "specificCountry") {
      payload.targetAudience = ["User"];
      payload.targetCountry = values.targetCountry;
    }

    try {
      const result = await sendNotification(payload);
      if (result) {
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting notification:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
        
          { text: "Send Notification" },
        ]}
      />

      <PagePath2
        title="Send Notification"
        description="Create a new notification and choose your target audience"
      />

      <div className="bg-white rounded-lg shadow-md p-6 mt-4 min-h-[600px]">
        <Formik
          innerRef={formikRef}
          initialValues={{
            title: "",
            message: "",
            targetAudience: "selectUsers",
            targetCountry: "",
            selectedUsers: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="space-y-6 pb-8">
              {/* Notification Title */}
              <FormField
                label="Notification Title"
                name="title"
                placeholder="Enter notification title"
                required
              />

              {/* Message */}
              <FormField
                label="Message"
                name="message"
                type="textarea"
                placeholder="Enter notification message"
                rows={5}
                required
              />

              {/* Target Audience Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {/* Select Users */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="targetAudience"
                      value="selectUsers"
                      checked={values.targetAudience === "selectUsers"}
                      onChange={(e) =>
                        handleTargetAudienceChange(e.target.value, setFieldValue)
                      }
                      className="w-5 h-5 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">
                      Select Users
                    </span>
                  </label>

                  {/* Specific Country */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="targetAudience"
                      value="specificCountry"
                      checked={values.targetAudience === "specificCountry"}
                      onChange={(e) =>
                        handleTargetAudienceChange(e.target.value, setFieldValue)
                      }
                      className="w-5 h-5 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">
                      Specific Country
                    </span>
                  </label>
                </div>
              </div>

              {/* Multi-Select User Types */}
              {targetAudience === "selectUsers" && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select User Types <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] flex items-center justify-between"
                    >
                      <span className={values.selectedUsers.length === 0 ? "text-gray-400" : "text-gray-700"}>
                        {getSelectedUsersDisplay(values.selectedUsers)}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {userTypeOptions.map((userType) => (
                          <label
                            key={userType.value}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              value={userType.value}
                              checked={values.selectedUsers.includes(userType.value)}
                              onChange={() =>
                                handleUserSelectionToggle(
                                  userType.value,
                                  setFieldValue,
                                  values.selectedUsers
                                )
                              }
                              className="w-4 h-4 text-[#FF6B00] focus:ring-[#FF6B00] rounded cursor-pointer"
                            />
                            <span className="text-gray-700">{userType.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {touched.selectedUsers && errors.selectedUsers && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedUsers}</p>
                  )}

                  {values.selectedUsers && values.selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {getSelectedUsersLabels(values.selectedUsers).map((user) => (
                        <div
                          key={user.value}
                          className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          <span>{user.label}</span>
                          <button
                            type="button"
                            onClick={() => removeUserSelection(user.value, setFieldValue, values.selectedUsers)}
                            className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {targetAudience === "specificCountry" && values.selectedUsers && values.selectedUsers.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Previously Selected User Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedUsersLabels(values.selectedUsers).map((user) => (
                      <div
                        key={user.value}
                        className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        <span>{user.label}</span>
                        <button
                          type="button"
                          onClick={() => removeUserSelection(user.value, setFieldValue, values.selectedUsers)}
                          className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {targetAudience === "specificCountry" && (
                <div className="relative mb-6">
                  <FormField
                    label="Country"
                    name="targetCountry"
                    fieldType="select"
                    options={[
                      { value: "", label: "Select Country" },
                      ...countryOptions,
                    ]}
                    required
                    disabled={countryLoading}
                    loading={countryLoading}
                  />

                  {values.targetCountry && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        <span>
                          {countryOptions.find(c => c.value === values.targetCountry)?.label || "Selected Country"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFieldValue("targetCountry", "")}
                          className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {targetAudience === "selectUsers" && values.targetCountry && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Previously Selected Country
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>
                        {countryOptions.find(c => c.value === values.targetCountry)?.label || "Selected Country"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFieldValue("targetCountry", "")}
                        className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  text="Cancel"
                  variant={2}
                  type="button"
                  onClick={handleCancel}
                  disabled={loading || isSubmitting}
                />
                <Button
                  text={loading || isSubmitting ? "Sending..." : "Send Notification"}
                  type="submit"
                  variant={1}
                  disabled={loading || isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SendNotification;