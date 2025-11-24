import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";

function CreateBanner() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static dropdown options
  const bannerTypes = [
    { label: "Refer", value: "Refer" },
    { label: "Offer", value: "Offer" },
    { label: "Information Banner", value: "Information Banner" },
    { label: "Refer Banner", value: "Refer Banner" },
  ];

  const serviceTypes = [
    { label: "Staff", value: "Staff" },
    { label: "User", value: "User" },
  ];

  // Static data for edit mode
  const bannerDetails = id
    ? {
        bannerType: "Refer",
        serviceType: "Staff",
        bannerImages: ["https://via.placeholder.com/150x150"],
      }
    : null;

  const validationSchema = Yup.object({
    bannerType: Yup.string().required("Banner type is required"),
    serviceType: Yup.string().required("Service type is required"),
    bannerImages: Yup.array().min(1, "At least one image is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Add submit logic here
    navigate("/app-management/manage-banner");
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {id ? (
        <BreadCrumb
          linkText={[
            { text: "Banner", href: "/app-management/manage-banner" },
            { text: "Banner Details", href: `/app-management/manage-banner/banner-details/` },
            { text: "Update Banner" },
          ]}
        />
      ) : (
        <BreadCrumb
          linkText={[
            
            { text: "Banner", href: "/app-management/manage-banner" },
            { text: "Create Banner" },
          ]}
        />
      )}

      <PagePath2 title={id ? "Update Banner" : "Create Banner"} />

      {/* Form Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <Formik
          initialValues={{
            bannerType: bannerDetails?.bannerType || "",
            serviceType: bannerDetails?.serviceType || "",
            bannerImages: bannerDetails?.bannerImages || [],
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                <FormField
                  label="Banner Type"
                  name="bannerType"
                  fieldType="select"
                  options={bannerTypes}
                  placeholder="Select Banner Type"
                />
                <FormField
                  label="Service Type"
                  name="serviceType"
                  fieldType="select"
                  options={serviceTypes}
                  placeholder="Select Service Type"
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Upload Banner Image(s)
                </label>

                {/* Upload Button */}
                <label
                  htmlFor="banner-upload"
                  className="bg-[#e65d00] text-white px-6 py-2 rounded-lg 
                    inline-flex items-center justify-center gap-2 cursor-pointer 
                    font-medium shadow hover:bg-[#d45400] hover:shadow-md 
                    transition duration-200 w-fit"
                >
                  Add Images
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="banner-upload"
                    onChange={(e) => {
                      setFieldValue("bannerImages", [
                        ...values.bannerImages,
                        ...Array.from(e.target.files),
                      ]);
                    }}
                  />

                  {values.bannerImages.length > 0 ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                      {values.bannerImages.map((file, idx) => {
                        const src =
                          file instanceof File
                            ? URL.createObjectURL(file)
                            : file;
                        return (
                          <div key={idx} className="relative group">
                            <img
                              src={src}
                              alt="Preview"
                              className="h-24 w-24 rounded-lg object-cover border shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFiles = values.bannerImages.filter(
                                  (_, i) => i !== idx
                                );
                                setFieldValue("bannerImages", updatedFiles);
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 
                                rounded-full text-white p-1 shadow-md opacity-90 
                                group-hover:opacity-100 transition"
                            >
                              <IoMdClose className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      No Images Selected
                    </div>
                  )}
                </div>

                <ErrorMessage
                  name="bannerImages"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center mt-5 gap-6">
                <Button
                  variant={2}
                  text="Cancel"
                  onClick={() => navigate("/app-management/manage-banner")}
                />
                <Button
                  variant={1}
                  text={id ? "Update" : "Create"}
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateBanner;