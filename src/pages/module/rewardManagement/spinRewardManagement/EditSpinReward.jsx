import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  rewardTitle: Yup.string().required("Reward title is required"),
  chooseReward: Yup.string().required("Please select a reward type"),
});

const EditSpinReward = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rewardData = location.state?.rewardData || null;

  const initialValues = {
    userType: rewardData?.userType || "user",
    rewardTitle: rewardData?.rewardTitle || "Batter Luck Next Time",
    chooseReward: rewardData?.chooseReward || "nothing",
  };

  const handleSubmit = (values, { resetForm }) => {
   
    alert("Spin reward updated successfully!");
    navigate("/spin-reward-management");
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* User Type & Reward Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="User Type"
                  name="userType"
                  fieldType="select"
                  options={[
                    { value: "", label: "Select User Type" },
                    { value: "user", label: "User" },
                    { value: "staff", label: "Staff" },
                    { value: "premium", label: "Premium" },
                    { value: "vip", label: "VIP" },
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
                  label="Choose Reward"
                  name="offerType"
                  fieldType="select"
                  options={[
                    { value: "", label: "Select Reward Type" },  
                    { value: "discount", label: "Flat Off" },
                    { value: "buyget", label: "Buy & Get" },
                    { value: "freedelivery", label: "Grab Ticket" },
                    { value: "productbundles", label: "Free Talk With Astrologer" },
                  ]}
                />

              </div>

              {/* Choose Reward Section */}


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
      </div>
    </div>
  );
};

export default EditSpinReward;