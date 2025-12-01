import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import { Clock } from "lucide-react";

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  rewardTitle: Yup.string().required("Reward title is required"),
  chooseReward: Yup.string().required("Please select a reward type"),
});

const mapRewardTypeFromApi = (apiValue = "") => {
  switch (apiValue) {
    case "Nothing":
      return "nothing";
    case "Flat Off":
      return "flatOff";
    case "Grab Ticket":
      return "grabTicket";
    case "Buy & Get":
      return "buy&Get";
    case "Free Talk With Astrologer":
      return "freeTalk";
    default:
      return "";
  }
};

const mapRewardTypeToApi = (formValue = "") => {
  switch (formValue) {
    case "nothing":
      return "Nothing";
    case "flatOff":
      return "Flat Off";
    case "grabTicket":
      return "Grab Ticket";
    case "buy&Get":
      return "Buy & Get";
    case "freeTalk":
      return "Free Talk With Astrologer";
    default:
      return "";
  }
};

const EditSpinReward = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const rewardId = id;

  const { loading, fetchSpinRewardById, updateSpinReward } =
    useSpinRewardManagement();

  const {
    loading: dropdownLoading,
    fetchUserType,
    userType,
    fetchProductDropdown,
    productDropdown,
  } = useDropdown();

  const [initialValues, setInitialValues] = useState({
    userType: "",
    rewardTitle: "",
    chooseReward: "",
    purchaseOption: "",
    product: "",
    offer: "",
    buyQuantity: "",
    getQuantity: "",
    ticketQuantity: "",
    freeTalkTime: "",
  });

  useEffect(() => {
    if (fetchUserType) {
      fetchUserType();
    }
    fetchProductDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropdownOptions =
    userType?.map((item) => ({
      value: item,
      label: item,
    })) || [];

  const productDrop =
    productDropdown?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  useEffect(() => {
    const loadReward = async () => {
      if (!rewardId) return;

      const data = await fetchSpinRewardById(rewardId);
      if (data) {
        const typeCode = mapRewardTypeFromApi(data.rewardType);

        setInitialValues((prev) => ({
          ...prev,
          userType: data.userType || "User",
          rewardTitle: data.title || "",
          chooseReward: typeCode,

          purchaseOption: data.rewardDetails?.purchaseOption || "",
          product: data.rewardDetails?.product || "",
          offer:
            typeof data.rewardDetails?.offer === "number"
              ? data.rewardDetails.offer
              : "",

          buyQuantity: data.rewardDetails?.buyQuantity || "",
          getQuantity: data.rewardDetails?.getQuantity || "",
          ticketQuantity: data.rewardDetails?.ticketQuantity || "",
          freeTalkTime: data.rewardDetails?.freeTalkTime || "",
        }));
      }
    };

    loadReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardId]);

  const handleSubmit = async (values) => {
    if (!rewardId) {
      alert("Reward ID missing");
      return;
    }

    const rewardTypeApi = mapRewardTypeToApi(values.chooseReward);

    let rewardDetails;

    switch (values.chooseReward) {
      case "flatOff":
        rewardDetails = {
          purchaseOption: values.purchaseOption,
          product: values.product,
          offer: Number(values.offer) || 0,
        };
        break;

      case "buy&Get":
        rewardDetails = {
          product: values.product,
          buyQuantity: Number(values.buyQuantity) || 0,
          getQuantity: Number(values.getQuantity) || 0,
        };
        break;

      case "grabTicket":
        rewardDetails = {
          ticketQuantity: Number(values.ticketQuantity) || 0,
        };
        break;

      case "freeTalk":
        rewardDetails = {
          freeTalkTime: values.freeTalkTime,
        };
        break;

      case "nothing":
      default:
        rewardDetails = undefined;
        break;
    }

    const payload = {
      userType: values.userType,
      title: values.rewardTitle,
      rewardType: rewardTypeApi,
      ...(rewardDetails && { rewardDetails }),
    };

    const updated = await updateSpinReward(rewardId, payload);
    if (updated) {
      navigate("/spin-reward-management");
    }
  };

  const handleCancel = () => {
    navigate("/spin-reward-management");
  };

  // ✅ UI
  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "Spin Reward Management", href: "/spin-reward-management" },
          { text: "Edit Spin Reward" },
        ]}
      />

      <PagePath2 title="Edit Spin Reward" />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        {loading && !initialValues.rewardTitle ? (
          <div className="flex justify-center py-6">
            <LoaderSpinner />
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className="space-y-6">
                {/* User Type & Reward Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="User Type"
                    name="userType"
                    fieldType="select"
                    options={[
                      {
                        value: "",
                        label: dropdownLoading
                          ? "Loading User Type..."
                          : "Select User Type",
                      },
                      ...dropdownOptions,
                    ]}
                  />
                  <FormField
                    label="Reward Title"
                    name="rewardTitle"
                    placeholder="Enter reward title"
                  />
                </div>

                {/* Reward Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Reward Type"
                    name="chooseReward"
                    fieldType="select"
                    options={[
                      { value: "", label: "Select Reward Type" },
                      { value: "nothing", label: "Nothing" },
                      { value: "buy&Get", label: "Buy & Get" },
                      { value: "flatOff", label: "Flat Off" },
                      { value: "grabTicket", label: "Grab Ticket" },
                      {
                        value: "freeTalk",
                        label: "Free Talk With Astrologer",
                      },
                    ]}
                  />
                </div>

                {values.chooseReward === "buy&Get" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Select Product"
                      name="product"
                      fieldType="select"
                      options={[
                        {
                          value: "",
                          label: dropdownLoading
                            ? "Loading products..."
                            : "Select Product",
                        },
                        ...productDrop,
                      ]}
                      loading={dropdownLoading}
                    />
                    <FormField
                      label="Buy Quantity"
                      name="buyQuantity"
                      placeholder="e.g. 1"
                    />
                    <FormField
                      label="Get Quantity"
                      name="getQuantity"
                      placeholder="e.g. 1"
                    />
                  </div>
                )}

                {values.chooseReward === "flatOff" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Purchase Option"
                      name="purchaseOption"
                      fieldType="select"
                      options={[
                        { value: "", label: "Select Purchase Option" },
                        { value: "Next Purchase", label: "Next Purchase" },
                        { value: "First Purchase", label: "First Purchase" },
                      ]}
                    />
                    <FormField
                      label="Select Product"
                      name="product"
                      fieldType="select"
                      options={[
                        {
                          value: "",
                          label: dropdownLoading
                            ? "Loading products..."
                            : "Select Product",
                        },
                        ...productDrop,
                      ]}
                      loading={dropdownLoading}
                    />
                    <FormField
                      label="Offer (%)"
                      name="offer"
                      placeholder="e.g. 15"
                    />
                  </div>
                )}

                {values.chooseReward === "grabTicket" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Ticket Quantity"
                      name="ticketQuantity"
                      placeholder="e.g. 1"
                    />
                  </div>
                )}

                {values.chooseReward === "freeTalk" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">
                        Free Talk Time
                      </label>
                      <div className="relative">
                        <Field
                          name="freeTalkTime"
                          type="time"
                          className="w-full border rounded-md px-10 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      </div>
                      <ErrorMessage
                        name="freeTalkTime"
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    text="Cancel"
                    variant={2}
                    type="button"
                    onClick={handleCancel}
                  />
                  <Button text="Save" type="submit" variant={1} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditSpinReward;
