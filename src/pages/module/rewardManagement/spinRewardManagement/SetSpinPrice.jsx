import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
  staffSpin: Yup.number()
    .positive("Spin count must be positive")
    .integer("Spin count must be an integer")
    .required("Staff spin is required"),
  staffPrice: Yup.number()
    .positive("Price must be positive")
    .required("Staff price is required"),
  userSpin: Yup.number()
    .positive("Spin count must be positive")
    .integer("Spin count must be an integer")
    .required("User spin is required"),
  userPrice: Yup.number()
    .positive("Price must be positive")
    .required("User price is required"),
});

const SetSpinPrice = () => {
  const navigate = useNavigate();

  const initialValues = {
    staffSpin: "1",
    staffPrice: "100",
    userSpin: "1",
    userPrice: "100",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Spin Price Updated:", values);
    alert("Spin price updated successfully!");
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
          { text: "Set Spin Price" },
        ]}
      />

      <PagePath2 title="Set Spin Price" />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-8">
              {/* Spin Price for Staff */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Spin Price for Staff
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Spin"
                    name="staffSpin"
                    type="number"
                    placeholder="Enter spin count"
                  />
                  <FormField
                    label="Price (₹)"
                    name="staffPrice"
                    type="number"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              {/* Spin Price for User */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Spin Price for User
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Spin"
                    name="userSpin"
                    type="number"
                    placeholder="Enter spin count"
                  />
                  <FormField
                    label="Price (Coin)"
                    name="userPrice"
                    type="number"
                    placeholder="Enter price"
                  />
                </div>
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
      </div>
    </div>
  );
};

export default SetSpinPrice;