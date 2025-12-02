import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import useDropdown from "../../../../hooks/dropdown/useDropdown";

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  rewardTitle: Yup.string().required("Reward title is required"),
  chooseReward: Yup.string().required("Please select a reward type"),
});


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

const AddSpinReward = () => {
  const navigate = useNavigate();

  const { addSpinReward, rewardTypes, fetchRewardTypes } =
    useSpinRewardManagement();

  const {
    loading: dropdownLoading,
    fetchUserType,
    userType,
    fetchProductDropdown,
    productDropdown,
  } = useDropdown();

  useEffect(() => {
    if (fetchUserType) fetchUserType();
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
    rewardTypes
      ?.map((rt) => {
        const internalValue = mapRewardTypeFromApi(rt); 
        if (!internalValue) return null; 
        return {
          value: internalValue,
          label: rt,
        };
      })
      .filter(Boolean) || [];

  const initialValues = {
    userType: "",
    rewardTitle: "",
    chooseReward: "",
    purchaseOption: "",
    product: "",
    offer: "",
    buyQuantity: "",
    getQuantity: "",
    ticketQuantity: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const rewardTypeApi = mapRewardTypeToApi(values.chooseReward);

    let rewardDetails;

    switch (values.chooseReward) {
      case "flatOff":
        rewardDetails = {
          product: values.product,
          purchaseOption: values.purchaseOption,
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
      rewardType: rewardTypeApi,
      ...(rewardDetails && { rewardDetails }),
    };

    const created = await addSpinReward(payload);
    if (created) {
      resetForm();
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
          { text: "Add Spin Reward" },
        ]}
      />

      <PagePath2 title="Add Spin Reward" />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              </div>

              {/* Buy & Get */}
              {values.chooseReward === "buy&Get" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Product"
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

              {/* Flat Off */}
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
                    label="Product"
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

              {/* Grab Ticket */}
              {values.chooseReward === "grabTicket" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Ticket Quantity"
                    name="ticketQuantity"
                    placeholder="e.g. 1"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  text="Cancel"
                  variant={2}
                  type="button"
                  onClick={handleCancel}
                />
                <Button text="Add Spin Reward" type="submit" variant={1} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSpinReward;
