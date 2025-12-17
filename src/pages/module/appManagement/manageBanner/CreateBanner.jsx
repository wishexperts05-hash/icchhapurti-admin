import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import { Formik, Form, ErrorMessage } from "formik";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useBanner from "../../../../hooks/appManagement/useManageBanner";
import { IoMdClose } from "react-icons/io";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

function CreateBanner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    fetchBannerTypesDropdown,
    bannerTypes,
    fetchAppTypesDropdown,
    appTypes,
    loadingAppTypes,
  } = useDropdown();

  const {
    createBanner,
    loading: bannerLoading,
    fetchBannerById,
    bannerDetail,
    updateBanner,
  } = useBanner();

  // Load app types on mount
  useEffect(() => {
    fetchAppTypesDropdown();
  }, []);

  // Fetch banner detail if editing
  useEffect(() => {
    if (id) fetchBannerById(id);
  }, [id]);

  // Fetch banner types after detail loads
  useEffect(() => {
    const appTypeFromDetail = bannerDetail?.data?.appType;
    if (appTypeFromDetail) {
      fetchBannerTypesDropdown(appTypeFromDetail);
    }
  }, [bannerDetail?.data?.appType]);

  // ---------- validation ----------
  const validationSchema = Yup.object({
    appType: Yup.string().required("Service Type is required"),
    bannerType: Yup.string().required("Banner Type is required"),
    bannerMedia: Yup.array().min(1, "At least one video is required"),
  });

  // ---------- initial values (supports edit) ----------
  const getInitialValues = () => {
    if (id && bannerDetail?.data) {
      const data = bannerDetail.data;
      const existingMedia = (data.mediaUrls || [])
        .filter((url) => url.match(/\.(mp4|webm|ogg|mov)$/i)) // Only videos
        .map((url) => ({
          url,
          type: "video",
        }));

      return {
        appType: data.appType || "",
        bannerType: data.bannerType || "",
        bannerMedia: existingMedia,
      };
    }

    return {
      appType: "",
      bannerType: "",
      bannerMedia: [],
    };
  };

  // ---------- helper to extract value from different onChange shapes ----------
  const extractValue = (input) => {
    if (input == null) return "";
    if (typeof input === "object" && !input.target) {
      if (Array.isArray(input)) {
        return input.map((it) => (typeof it === "object" ? it.value ?? it.label ?? it : it));
      }
      return input.value ?? input.label ?? "";
    }
    if (input.target) return input.target.value;
    return input;
  };

  // ---------- format backend options to { label, value } ----------
  const formatOptions = (options) => {
    if (!options) return [];
    if (!Array.isArray(options)) return [];
    if (options.length === 0) return [];

    if (typeof options[0] === "string") {
      return options.map((v) => ({ label: v, value: v }));
    }

    if (typeof options[0] === "object") {
      return options.map((o) => ({
        label: o.label ?? o.name ?? o.title ?? o.bannerType ?? JSON.stringify(o),
        value: o.value ?? o.id ?? o.bannerType ?? o.name ?? o.title ?? JSON.stringify(o),
      }));
    }

    return [];
  };

  // ---------- submit ----------
  const handleSubmit = async (values, formikHelpers) => {
    try {
      const formData = new FormData();
      formData.append("appType", values.appType);
      formData.append("bannerType", values.bannerType);

      const newFiles = values.bannerMedia.filter((m) => m.file);
      const existingUrls = values.bannerMedia.filter((m) => m.url && !m.file);

      newFiles.forEach((media) => formData.append("banners", media.file));
      existingUrls.forEach((m) => formData.append("existingMediaUrls", m.url));

      if (id) await updateBanner(id, formData);
      else await createBanner(formData);

      formikHelpers.setSubmitting(false);
      navigate("/app-management/manage-banner");
    } catch (error) {
      console.error("Error submitting banner:", error);
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {id ? (
        <BreadCrumb
          linkText={[
            { text: "Banner", href: "/app-management/manage-banner" },
            {
              text: "Banner Details",
              href: `/app-management/manage-banner/banner-details/${id}`,
            },
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

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        {loadingAppTypes ? (
          <div className="flex justify-center py-20">
            <LoaderSpinner />
          </div>
        ) : (
          <Formik
            enableReinitialize
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => {
              const onAppTypeChange = (input) => {
                const value = extractValue(input);
                setFieldValue("appType", value);
                setFieldValue("bannerType", "");
                if (value) fetchBannerTypesDropdown(value);
              };

              const onBannerTypeChange = (input) => {
                const value = extractValue(input);
                setFieldValue("bannerType", value);
              };

              return (
                <Form className="flex flex-col gap-6">
                  {/* DROPDOWNS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SERVICE TYPE */}
                    <FormField
                      label="Service Type"
                      name="appType"
                      fieldType="select"
                      options={formatOptions(appTypes)}
                      placeholder="Select Service Type"
                      value={values.appType}
                      onChange={onAppTypeChange}
                    />

                    {/* BANNER TYPE */}
                    <FormField
                      label="Banner Type"
                      name="bannerType"
                      fieldType="select"
                      options={formatOptions(bannerTypes)}
                      placeholder={
                        values.appType ? "Select Banner Type" : "Select Service Type First"
                      }
                      disabled={!values.appType}
                      value={values.bannerType}
                      onChange={onBannerTypeChange}
                    />
                  </div>

                  {/* VIDEO UPLOAD */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Upload Banner Media</label>

                    <div>
                      <label
                        htmlFor="banner-upload"
                        className="text-yellow-500 underline cursor-pointer hover:text-yellow-600 transition-colors"
                      >
                         Upload video
                      </label>
                    </div>

                    <input
                      type="file"
                      id="banner-upload"
                      className="hidden"
                      multiple
                      accept="video/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const newMedia = files.map((file) => ({
                          file,
                          type: "video",
                        }));
                        setFieldValue("bannerMedia", [...values.bannerMedia, ...newMedia]);
                      }}
                    />

                    {/* PREVIEW */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {values.bannerMedia?.length > 0 ? (
                        <div className="flex flex-wrap gap-4 justify-center">
                          {values.bannerMedia.map((media, idx) => {
                            const src = media.file ? URL.createObjectURL(media.file) : media.url;

                            return (
                              <div key={idx} className="relative group">
                                <video src={src} className="h-24 w-24 rounded-lg object-cover border shadow-sm" />

                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = values.bannerMedia.filter((_, i) => i !== idx);
                                    setFieldValue("bannerMedia", updated);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                                >
                                  <IoMdClose />
                                </button>

                                <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                                   video
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm text-center">No Videos Selected</p>
                      )}
                    </div>

                    <ErrorMessage name="bannerMedia" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* BUTTONS */}
                  <div className="flex justify-center gap-6 mt-5">
                    <Button variant={2} text="Cancel" onClick={() => navigate("/app-management/manage-banner")} disabled={bannerLoading || isSubmitting} />
                    <Button variant={1} text={bannerLoading || isSubmitting ? "Processing..." : id ? "Update" : "Create"} type="submit" disabled={bannerLoading || isSubmitting} />
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default CreateBanner;