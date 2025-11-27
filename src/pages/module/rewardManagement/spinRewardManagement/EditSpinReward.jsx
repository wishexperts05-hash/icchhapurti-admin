import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  rewardTitle: Yup.string().required("Reward title is required"),
  chooseReward: Yup.string().required("Please select a reward type"),
  // offer: Yup.number().typeError("Offer must be a number"),
});

const EditSpinReward = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, fetchSpinRewardById, updateSpinReward } =
    useSpinRewardManagement();

  // 👇 List page se aaya hua reward (sirf id, title, rewardType, userType)
  const rewardFromList = location.state?.reward || null;
  const rewardId = rewardFromList?._id;

  const [initialValues, setInitialValues] = useState({
    userType: "",
    rewardTitle: "",
    chooseReward: "",
    purchaseOption: "",
    product: "",
    offer: "",
  });

  // 🔹 Page load pe full details laao (rewardDetails etc.)
  useEffect(() => {
    const loadReward = async () => {
      if (!rewardId) return;

      const data = await fetchSpinRewardById(rewardId);
      if (data) {
        setInitialValues({
          userType: data.userType || "User",
          rewardTitle: data.title || "",
          chooseReward: data.rewardType || "",
          purchaseOption: data.rewardDetails?.purchaseOption || "",
          product: data.rewardDetails?.product || "",
          offer:
            typeof data.rewardDetails?.offer === "number"
              ? data.rewardDetails.offer
              : "",
        });
      }
    };

    loadReward();
  }, [rewardId, fetchSpinRewardById]);

  const handleSubmit = async (values) => {
    if (!rewardId) {
      alert("Reward ID missing");
      return;
    }

    const payload = {
      userType: values.userType,
      title: values.rewardTitle,
      rewardType: values.chooseReward,
      rewardDetails: {
        purchaseOption: values.purchaseOption,
        product: values.product,
        offer: Number(values.offer) || 0,
      },
    };

    const updated = await updateSpinReward(rewardId, payload);
    if (updated) {
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
                {/* User Type & Reward Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="User Type"
                    name="userType"
                    fieldType="select"
                    options={[
                      { value: "", label: "Select User Type" },
                      { value: "User", label: "User" },
                      { value: "Staff", label: "Staff" },
                      { value: "Premium", label: "Premium" },
                      { value: "VIP", label: "VIP" },
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
                      { value: "Flat Off", label: "Flat Off" },
                      { value: "Grab Ticket", label: "Grab Ticket" },
                      { value: "Nothing", label: "Better Luck Next Time" },
                    ]}
                  />
                </div>

                {/* Reward Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Purchase Option"
                    name="purchaseOption"
                    placeholder="e.g. Next Purchase"
                  />
                  <FormField
                    label="Product ID"
                    name="product"
                    placeholder="Enter product ID"
                  />
                  <FormField
                    label="Offer (%)"
                    name="offer"
                    placeholder="e.g. 15"
                  />
                </div>

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
