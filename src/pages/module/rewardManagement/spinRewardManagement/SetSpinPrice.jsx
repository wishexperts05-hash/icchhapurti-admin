import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useSpinRewardManagement from "../../../../hooks/rewardManagement/useSpinRewardManagement";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

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

  const { loading, fetchSpinPrice, createOrUpdateSpinPrice } =
    useSpinRewardManagement();

  const [initialValues, setInitialValues] = useState({
    staffSpin: "1",
    staffPrice: "",
    userSpin: "1",
    userPrice: "",
  });

  useEffect(() => {
    const loadPrice = async () => {
      const data = await fetchSpinPrice();
      if (data) {
        setInitialValues((prev) => ({
          ...prev,
          staffPrice: data.staffPricePerSpin?.toString() || "",
          userPrice: data.userPricePerSpin?.toString() || "",
        }));
      }
    };

    loadPrice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (values) => {
    const payload = {
      staffPricePerSpin: Number(values.staffPrice),
      userPricePerSpin: Number(values.userPrice),
    };

    const updated = await createOrUpdateSpinPrice(payload);
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
        linkText={[ { text: "Reward Management" },
          { text: "Spin Reward Management", href: "/spin-reward-management" },
          { text: "Set Spin Price" },
        ]}
      />

      <PagePath2 title="Set Spin Price" />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        {loading && !initialValues.staffPrice && !initialValues.userPrice ? (
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
            {() => (
              <Form className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Spin Price for Staff
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Spin"
                      name="staffSpin"
                      type="number"
                      readOnly
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

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Spin Price for User
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Spin"
                      name="userSpin"
                      type="number"
                       readOnly
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

export default SetSpinPrice;
