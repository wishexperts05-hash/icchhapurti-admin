// src/pages/.../EditSpinReward.jsx

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
    default:
      return "";
  }
};

const EditSpinReward = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const rewardId = id;

  const {
    loading,
    fetchSpinRewardById,
    updateSpinReward,
    rewardTypes,       
    fetchRewardTypes,   
  } = useSpinRewardManagement();

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
   isSpinEligible: false,

  });

  useEffect(() => {
    if (fetchUserType) {
      fetchUserType();
    }
    fetchProductDropdown();
    fetchRewardTypes(); 
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

  
  const rewardTypeOptions =
    (rewardTypes || []).map((rt) => ({
      value: mapRewardTypeFromApi(rt), 
      label: rt,                       
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
         isSpinEligible: data.isSpinEligible ?? false,

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

      case "nothing":
      default:
        rewardDetails = undefined;
        break;
    }

    const payload = {
      userType: values.userType,
      title: values.rewardTitle,
      rewardType: rewardTypeApi,  isSpinEligible:
    values.isSpinEligible,
      ...(rewardDetails && { rewardDetails }),
    };

    const updated = await updateSpinReward(rewardId, payload);
    if (updated?.success) {
      navigate("/spin-reward-management");
    }
  };

  const handleCancel = () => {
    navigate("/spin-reward-management");
  };

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

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Reward Type"
                    name="chooseReward"
                    fieldType="select"
                    options={rewardTypeOptions}   
                  />

                    <FormField
    label="Spin Eligibility"
    name="isSpinEligible"
    fieldType="select"
    options={[
      { value: true, label: "Eligible for Spin" },
      { value: false, label: "Not Eligible for Spin" },
    ]}
  />
                </div>

             
                {values.chooseReward === "buy&Get" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Select Product"
                      name="product"
                      fieldType="select"
                     options={productDrop}


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
                       
                        { value: "Next Purchase", label: "Next Purchase" },
                        { value: "First Purchase", label: "First Purchase" },
                      ]}
                    />
                    <FormField
                      label="Select Product"
                      name="product"
                      fieldType="select"
                      options={productDrop}


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
