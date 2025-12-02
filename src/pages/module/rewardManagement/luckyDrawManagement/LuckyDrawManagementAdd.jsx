import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";

import useLuckyDrawManagement from "../../../../hooks/rewardManagement/useLuckyDrawManagement";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required("Event name is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  rules: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required("Product is required"),
      ticketsPerQuantity: Yup.number()
        .typeError("Tickets per product must be a number")
        .positive("Tickets per product must be positive")
        .integer("Tickets per product must be an integer")
        .required("Tickets per product is required"),
    })
  ),
  numberOfWinners: Yup.number()
    .typeError("Number of winners must be a number")
    .integer("Number of winners must be an integer")
    .positive("Number of winners must be positive")
    .required("Number of winners is required"),
  resultAnnouncementDate: Yup.date().required(
    "Result announcement date is required"
  ),
});

const LuckyDrawManagementAdd = () => {
  const navigate = useNavigate();

  const { loading, createLuckyDraw } = useLuckyDrawManagement();

  const {
    loading: dropdownLoading,
    fetchUserType,
    fetchProductDropdown,
    productDropdown,
  } = useDropdown();

  useEffect(() => {
    fetchUserType();
    fetchProductDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropdownOptions =
    productDropdown?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const [productImageSets, setProductImageSets] = useState([[]]);

  const initialValues = {
    eventName: "",
    startDate: "",
    endDate: "",
    rules: [
      {
        productId: "",
        ticketsPerQuantity: "",
      },
    ],
    numberOfWinners: "",
    resultAnnouncementDate: "",
  };

  const handleImageUpload = (e, setIndex) => {
    const files = Array.from(e.target.files);
    const newImageSets = [...productImageSets];

    if (!newImageSets[setIndex]) {
      newImageSets[setIndex] = [];
    }

    if (files.length + newImageSets[setIndex].length > 10) {
      alert("Maximum 10 images allowed per set");
      return;
    }

    newImageSets[setIndex] = [...newImageSets[setIndex], ...files];
    setProductImageSets(newImageSets);
  };

  const handleRemoveImage = (setIndex, imageIndex) => {
    const newImageSets = [...productImageSets];
    newImageSets[setIndex] = newImageSets[setIndex].filter(
      (_, i) => i !== imageIndex
    );
    setProductImageSets(newImageSets);
  };

  const handleAddImageSet = () => {
    setProductImageSets([...productImageSets, []]);
  };

  const handleRemoveImageSet = (setIndex) => {
    if (productImageSets.length > 1) {
      setProductImageSets(productImageSets.filter((_, i) => i !== setIndex));
    }
  };

  const handleCancel = () => {
    navigate("/lucky-draw-management");
  };

  const normalizeDate = (v) => {
    if (!v) return "";
    if (v instanceof Date) {
      return v.toISOString().slice(0, 10); // yyyy-mm-dd
    }
    return v;
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      eventName: values.eventName,
      startDate: normalizeDate(values.startDate),
      endDate: normalizeDate(values.endDate),
      announcementDate: normalizeDate(values.resultAnnouncementDate),
      productRules: (values.rules || []).map((r) => ({
        productId: r.productId,
        ticketsPerQuantity: Number(r.ticketsPerQuantity),
      })),
      numberOfWinners: Number(values.numberOfWinners),
    };

    const res = await createLuckyDraw(payload);

    if (res?.success) {
      resetForm();
      setProductImageSets([[]]);
      navigate("/lucky-draw-management");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "Lucky Draw Management", href: "/lucky-draw-management" },
          { text: "Add New Lucky Draw" },
        ]}
      />

      <PagePath2
        title="Add New Lucky Draw"
        description="Fill in the lucky draw details below to create a new event."
      />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-6">
              {/* Event Name, Start Date, End Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Event Name"
                  name="eventName"
                  placeholder="Enter event name"
                />
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
                <FormField
                  label="End Date"
                  name="endDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
              </div>

              {/* Rules Setup Section */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Rules Setup
                </h3>
                <FieldArray name="rules">
                  {({ push, remove }) => (
                    <>
                      {values.rules.map((rule, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-start gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                              {/* Product dropdown: productId */}
                              <FormField
                                label="Select Product"
                                name={`rules.${index}.productId`}
                                fieldType="select"
                                options={[
                                  {
                                    value: "",
                                    label: dropdownLoading
                                      ? "Loading products..."
                                      : "Select Product",
                                  },
                                  ...dropdownOptions,
                                ]}
                                loading={dropdownLoading}
                              />
                              <FormField
                                label="Tickets per Quantity"
                                name={`rules.${index}.ticketsPerQuantity`}
                                type="number"
                                placeholder="Enter number of tickets"
                              />
                            </div>
                            {values.rules.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-8 text-red-500 hover:text-red-700 text-2xl transition-colors"
                                title="Remove rule"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            productId: "",
                            ticketsPerQuantity: "",
                          })
                        }
                        className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                      >
                        + Add More
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Prize Distribution Section */}
              <div className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Number of Winners"
                    name="numberOfWinners"
                    type="number"
                    placeholder="Enter number of winners"
                  />
                  <FormField
                    label="Result Announcement Date"
                    name="resultAnnouncementDate"
                    type="date"
                    placeholder="DD-MM-YYYY"
                  />
                </div>
              </div>

            
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Product Images (Min 3)
                </h3>
                {productImageSets.map((imageSet, setIndex) => (
                  <div key={setIndex} className="mb-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-4 mt-4">
                          {imageSet.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              className="relative w-24 h-24 border rounded-lg overflow-hidden"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`product-${setIndex}-${imageIndex}`}
                                className="object-cover w-full h-full"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(setIndex, imageIndex)
                                }
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ))}

                          <label
                            htmlFor={`upload-${setIndex}`}
                            className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus className="text-gray-500 text-xl" />
                            <input
                              id={`upload-${setIndex}`}
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, setIndex)}
                            />
                          </label>
                        </div>
                      </div>
                      {productImageSets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageSet(setIndex)}
                          className="mt-4 text-red-500 hover:text-red-700 text-2xl transition-colors"
                          title="Remove image set"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImageSet}
                  className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                >
                  + Add More
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  text="Cancel"
                  variant={2}
                  type="button"
                  onClick={handleCancel}
                />
                <Button
                  text={loading ? "Creating..." : "ADD"}
                  type="submit"
                  variant={1}
                  disabled={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LuckyDrawManagementAdd;
