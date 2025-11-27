import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { FaEquals } from "react-icons/fa";
import useCoinSetting from "../../../../hooks/monetarySettings/useCoinSetting";

export default function CoinSettings() {
  const { coinSetting, loading, fetchCoinSetting, updateCoinSetting } = useCoinSetting();
  const [currentPage, setCurrentPage] = useState("view");
  const [canUpdate] = useState(true);

  useEffect(() => {
    fetchCoinSetting();
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
    // Format data to match API requirement
    const formattedData = {
      setCoinValue: {
        coin: values.setCoinValue?.coin || 0,
        rate: values.setCoinValue?.rate || 0,
      },
      minimumCoinsToConvert: values.minimumCoinsToConvert || 0,
    };
    await updateCoinSetting(formattedData);
    // Refetch updated data
    await fetchCoinSetting();
    handleBack();
  };

  const handleBack = () => setCurrentPage("view");

  const formatCoinSettingData = (data) => {
    if (!data) return {
      minimumCoinsToConvert: 0,
      setCoinValue: { coin: 0, rate: 0 }
    };

    return {
      minimumCoinsToConvert: data.minimumCoinsToConvert || 0,
      setCoinValue: {
        coin: data.setCoinValue?.coin || 0,
        rate: data.setCoinValue?.rate || 0,
      },
    };
  };

  return (
    <div className="min-h-screen">
      {currentPage === "view" && (
        <CoinSetting
          onEdit={handleEdit}
          coinSettingData={formatCoinSettingData(coinSetting)}
          canUpdate={canUpdate}
        />
      )}
      {currentPage === "edit" && (
        <EditCoinSetting
          initialData={formatCoinSettingData(coinSetting)}
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
    <>
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
            value={coinSettingData.minimumCoinsToConvert}
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
    </>
  );
}

function EditCoinSetting({ initialData, onBack, onUpdate, loading }) {
  const validationSchema = Yup.object({
    minimumCoinsToConvert: Yup.number()
      .required("Minimum coins is required")
      .min(0, "Must be positive"),
    setCoinValue: Yup.object({
      coin: Yup.number()
        .required("Coin value is required")
        .min(0, "Must be positive"),
      rate: Yup.number()
        .required("Rate is required")
        .min(0, "Must be positive"),
    }),
  });

  return (
    <>
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
                name="minimumCoinsToConvert"
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
    </>
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
