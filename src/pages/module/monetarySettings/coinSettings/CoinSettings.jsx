import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { FaEquals } from "react-icons/fa";

export default function CoinSettings() {
  // const { updateChargesAndBenefits, fetchChargesAndBenefits, loading, chargesAndBenefits } = useChargesAndBenefits();
  const [currentPage, setCurrentPage] = useState("commission-settings");
  const [coinSettings, setCoinSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canUpdate] = useState(true);

  // TEMPORARY DUMMY Data
  const dummyApiData = {
    minimumCoins: 10,
    setCoinValue: {
      coin: 2,
      rate: 3,
    },
  };

  const fetchCoinSettings = async () => {
    setLoading(true);
    setTimeout(() => {
      setCoinSettings(dummyApiData);
      setLoading(false);
    }, 500);
  };

  const updateCoinSettings = async (values) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("UPDATED DATA:", values);
        setCoinSettings(values); // update UI
        setLoading(false);
        resolve(true);
      }, 800);
    });
  };

  useEffect(() => {
    fetchCoinSettings();
  }, []);

  //   const { subAdminAccess } = useLogin();
  // const { canCreate, canRead, canUpdate, canDelete } = usePermissions(subAdminAccess, "Chargers & Benefit");
  // console.log("Chargers & Benefit Permissions:", { canCreate, canRead, canUpdate, canDelete });

  const handleEdit = () => {
    if (canUpdate) {
      setCurrentPage("edit");
    }
  };

  const handleUpdate = async (values) => {
    const isSuccess = await updateCoinSettings(values);
    if (isSuccess) {
      handleBack();
    }
  };

  const handleBack = () => setCurrentPage("commission-settings");

  const formatCoinSettingData = (data) => {
    if (!data) return {};

    return {
      minimumCoins: data.minimumCoins || 0,
      setCoinValue: {
        coin: data.setCoinValue?.coin || 0,
        rate: data.setCoinValue?.rate || 0,
      },
    };
  };

  return (
    <div className="min-h-screen">
      {currentPage === "commission-settings" && (
        <CoinSetting
          onEdit={handleEdit}
          coinSettingData={formatCoinSettingData(coinSettings)}
          canUpdate={canUpdate}
        />
      )}
      {currentPage === "edit" && (
        <EditCoinSetting
          initialData={formatCoinSettingData(coinSettings)}
          onBack={handleBack}
          onUpdate={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
}

function CoinSetting({ onEdit, coinSettingData, canUpdate }) {
  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Commission Settings" },
          { text: "Coin Settings" },
        ]}
      />
      <PagePath2 title="Coin Settings" />

      <div className="space-y-6 bg-white pt-6 pb-8 rounded-xl">
        {/* Set Minimum Coins to Convert into Money */}
        <Section title="Set Minimum Coins to Convert into Money">
          <FieldView
            label="Minimum Coins"
            value={coinSettingData.minimumCoins}
          />
        </Section>

        {/* Set Coin Value */}
        <Section title="Set Coin Value">
          <FieldView
            label="Coin"
            value={coinSettingData.setCoinValue?.coin}
          />
          <FaEquals />
          <FieldView
            label="Rate (₹)"
            value={coinSettingData.setCoinValue?.rate}
          />
        </Section>   
      </div>

      <div className="flex justify-center py-6 gap-4">
        <Button
          type="button"
          text="Edit"
          variant={1}
          onClick={onEdit}
          disabled={!canUpdate}
        />
      </div>
    </div>
  );
}

function EditCoinSetting({ initialData, onBack, onUpdate, loading }) {
  const validationSchema = Yup.object({
    directSaleQuantity: Yup.number()
      .required("Required")
      .min(0, "Must be positive"),
    directSaleCoins: Yup.number()
      .required("Required")
      .min(0, "Must be positive"),
    luckDraw: Yup.object({
      luckyDrawTicketQuantity: Yup.number()
        .required("Required")
        .min(0, "Must be positive")
        .max(100, "Cannot exceed 100%"),
      luckyDrawTicket: Yup.number()
        .required("Required")
        .min(0, "Must be positive")
    }),
    withdrawAmount: Yup.object({
      totalWalletBalance: Yup.number()
        .required("Required")
        .min(0, "Must be positive")
        .max(100, "Cannot exceed 100%"),
      dayForWithdraw: Yup.number()
        .required("Required")
        .min(0, "Must be positive")
    }),
  });

  return (
    <div>
       <BreadCrumb
        linkText={[{ text: "Commission Setting" }, { text: "Edit Coin Setting" }]}
      />
      <PagePath2 title="Edit Coin Setting" />

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={onUpdate}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Form className="space-y-6 bg-white pt-6 pb-8 rounded-lg">
            <Section title="Set Minimum Coins to Convert into Money">
              <FormField
                label="Minimum Coins :"
                name="minimumCoins"
                type="number"
              />
            </Section>

            <Section title="Set Coin Value">
              <FormField
                label="Coin"
                name="setCoinValue.coin"
                type="number"
              />
              <FormField
                label="Rate (₹)"
                name="setCoinValue.rate"
                type="number"
              />
            </Section>

            <div className="flex justify-center pt-6 gap-4 pb-6">
              <Button
                type="button"
                text="Cancel"
                variant={2}
                onClick={onBack}
                disabled={loading}
              />
              <Button
                type="button"
                text={loading ? "Updating..." : "Update"}
                variant={1}
                onClick={handleSubmit}
                disabled={loading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Reusable section wrapper
function Section({ title, children }) {
  const isCoinValueRow =
    Array.isArray(children) && children.length === 3; // Quantity, "=", Rate

  return (
    <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>

      {/* If row has 3 items → show in a single row */}
      {isCoinValueRow ? (
        <div className="flex items-end gap-4">
          <div className="flex-1">{children[0]}</div>

          <div className="flex items-start justify-start text-xl px-2  pb-4">
            {children[1]}
          </div>

          <div className="flex-1">{children[2]}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children}
        </div>
      )}
    </div>
  );
}


// Read-only field box
function FieldView({ label, value }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-gray-900">
        {value}
      </div>
    </div>
  );
}
