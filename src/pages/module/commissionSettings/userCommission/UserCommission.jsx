import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";

export default function UserCommission() {
  // const { updateChargesAndBenefits, fetchChargesAndBenefits, loading, chargesAndBenefits } = useChargesAndBenefits();
  const [currentPage, setCurrentPage] = useState("commission-settings");
  const [userCommission, setUserCommission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canUpdate] = useState(true);

  // TEMPORARY DUMMY Data
  const dummyApiData = {
    directSaleQuantity: 10,
    directSaleCoins: 50,
    luckDraw: {
      luckyDrawTicketQuantity: 2,
      luckyDrawTicket: 3,
    },
    withdrawAmount: {
      totalWalletBalance: 2,
      dayForWithdraw: 3,
    },
  };

  const fetchUserCommission = async () => {
    setLoading(true);
    setTimeout(() => {
      setUserCommission(dummyApiData);
      setLoading(false);
    }, 500);
  };

  const updateUserCommission = async (values) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("UPDATED DATA:", values);
        setUserCommission(values); // update UI
        setLoading(false);
        resolve(true);
      }, 800);
    });
  };

  useEffect(() => {
    fetchUserCommission();
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
    const isSuccess = await updateUserCommission(values);
    if (isSuccess) {
      handleBack();
    }
  };

  const handleBack = () => setCurrentPage("commission-settings");

  const formatCommissionData = (data) => {
    if (!data) return {};

    return {
      directSaleQuantity: data.directSaleQuantity || 0,
      directSaleCoins: data.directSaleCoins || 0,
      luckDraw: {
        luckyDrawTicketQuantity: data.luckDraw?.luckyDrawTicketQuantity || 0,
        luckyDrawTicket: data.luckDraw?.luckyDrawTicket || 0,
      },
      withdrawAmount: {
        totalWalletBalance: data.withdrawAmount?.totalWalletBalance || 0,
        dayForWithdraw: data.withdrawAmount?.dayForWithdraw || 0,
      },
    };
  };

  return (
    <div className="min-h-screen">
      {currentPage === "commission-settings" && (
        <CommissionSetting
          onEdit={handleEdit}
          commissionData={formatCommissionData(userCommission)}
          canUpdate={canUpdate}
        />
      )}
      {currentPage === "edit" && (
        <EditCommissionSetting
          initialData={formatCommissionData(userCommission)}
          onBack={handleBack}
          onUpdate={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
}

function CommissionSetting({ onEdit, commissionData, canUpdate }) {
  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Commission Settings" },
          { text: "User Commission" },
        ]}
      />
      <PagePath2 title="User Commission" />

      <div className="space-y-6 bg-white pt-6 pb-8 rounded-xl">
        {/* Direct sale Section */}
        <Section title="Set User Commission for Direct Sale">
          <FieldView
            label="Quantity"
            value={commissionData.directSaleQuantity}
          />
          <FieldView
            label="Coins"
            value={commissionData.directSaleCoins}
          />
        </Section>

        {/* Lucky Draw Ticket */}
        <Section title="Set Lucky Draw Ticket on Purchase for User">
          <FieldView
            label="Quantity"
            value={commissionData.luckDraw?.luckyDrawTicketQuantity}
          />
          <FieldView
            label="Lucky Draw Ticket"
            value={commissionData.luckDraw?.luckyDrawTicket}
          />
        </Section>

        {/* Total Wallet Balance For Staff */}

        <Section title="Set Withdraw Amount % Of Total Wallet Balance For User">
          <FieldView
            label="Amount % Of Total Wallet Balance"
            value={commissionData.withdrawAmount?.totalWalletBalance}
          />
          <FieldView
            label="Select Day Of Month For Withdraw"
            value={commissionData.withdrawAmount?.dayForWithdraw}
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

function EditCommissionSetting({ initialData, onBack, onUpdate, loading }) {
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
        linkText={[{ text: "Commission Setting" }, { text: "Edit User Commission" }]}
      />
      <PagePath2 title="Edit User Commission" />

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={onUpdate}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Form className="space-y-6 bg-white pt-6 pb-8 rounded-lg">
            <Section title="Set User Commission for Direct Sale">
              <FormField
                label="Quantity"
                name="directSaleQuantity"
                type="number"
              />
              <FormField
                label="Coins"
                name="directSaleCoins"
                type="number"
              />
            </Section>

            <Section title="Set Lucky Draw Ticket on Purchase for User">
              <FormField
                label="Quantity"
                name="luckDraw.luckyDrawTicketQuantity"
                type="number"
              />
              <FormField
                label="Lucky Draw Ticket"
                name="luckDraw.luckyDrawTicket"
                type="number"
              />
            </Section>

            <Section title="Set Withdraw Amount % Of Total Wallet Balance For User">
              <FormField
                label="Amount % Of Total Wallet Balance"
                name="withdrawAmount.totalWalletBalance"
                type="number"
              />
              <FormField
                label="Select Day Of Month For Withdraw"
                name="withdrawAmount.dayForWithdraw"
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
  return (
    <div className="mx-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
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
