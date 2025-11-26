import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";

import useWithdrawSetting from "../../../../hooks/monetarySettings/useWithdrawSetting";

const SECTION_KEYS = [
  { key: "withdrawAmountSettingForUser", title: "User Withdraw Settings" },
  { key: "withdrawAmountSettingForPromoter", title: "Promoter Withdraw Settings" },
  { key: "withdrawAmountSettingForStaff", title: "Staff Withdraw Settings" },
];

// ---------- DEFAULT VALUES ----------
const defaultInitialValues = {
  withdrawAmountSettingForUser: {
    AmountPercentageForWithdraw: 0,
    daysOfMonthForWithdraw: [],
  },
  withdrawAmountSettingForPromoter: {
    AmountPercentageForWithdraw: 0,
    daysOfMonthForWithdraw: [],
  },
  withdrawAmountSettingForStaff: {
    AmountPercentageForWithdraw: 0,
    daysOfMonthForWithdraw: [],
  },
};

// ---------- VALIDATION ----------
const dayValidation = Yup.string()
  .matches(/^[0-9]{1,2}$/, "Day must be a number")
  .test("range", "Day must be between 1 and 31", v => {
    const num = Number(v);
    return num >= 1 && num <= 31;
  });

const validationSchema = Yup.object({
  withdrawAmountSettingForUser: Yup.object({
    AmountPercentageForWithdraw: Yup.number()
      .required("Amount % of Wallet is required")
      .min(0, "Amount % of Wallet must be greater than or equal to 0")
      .max(100, "Amount % of Wallet must be less than or equal to 100"),
    daysOfMonthForWithdraw: Yup.array().of(dayValidation),
  }),
  withdrawAmountSettingForPromoter: Yup.object({
    AmountPercentageForWithdraw: Yup.number()
      .required("Amount % of Wallet is required")
      .min(0, "Amount % of Wallet must be greater than or equal to 0")
      .max(100, "Amount % of Wallet must be less than or equal to 100"),
    daysOfMonthForWithdraw: Yup.array().of(dayValidation),
  }),
  withdrawAmountSettingForStaff: Yup.object({
    AmountPercentageForWithdraw: Yup.number()
      .required("Amount % of Wallet is required")
      .min(0, "Amount % of Wallet must be greater than or equal to 0")
      .max(100, "Amount % of Wallet must be less than or equal to 100"),
    daysOfMonthForWithdraw: Yup.array().of(dayValidation),
  }),
});

export default function WithDrawSettings() {
  const {
    withdrawSetting,
    fetchWithdrawSetting,
    updateWithdrawSetting,
  } = useWithdrawSetting();

  const [pageMode, setPageMode] = useState("view");
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const formatFromApi = (data) => ({
    withdrawAmountSettingForUser: {
      AmountPercentageForWithdraw:
        data.withdrawAmountSettingForUser?.AmountPercentageForWithdraw ?? 0,
      daysOfMonthForWithdraw:
        data.withdrawAmountSettingForUser?.daysOfMonthForWithdraw ?? [],
    },
    withdrawAmountSettingForPromoter: {
      AmountPercentageForWithdraw:
        data.withdrawAmountSettingForPromoter?.AmountPercentageForWithdraw ?? 0,
      daysOfMonthForWithdraw:
        data.withdrawAmountSettingForPromoter?.daysOfMonthForWithdraw ?? [],
    },
    withdrawAmountSettingForStaff: {
      AmountPercentageForWithdraw:
        data.withdrawAmountSettingForStaff?.AmountPercentageForWithdraw ?? 0,
      daysOfMonthForWithdraw:
        data.withdrawAmountSettingForStaff?.daysOfMonthForWithdraw ?? [],
    },
  });

  useEffect(() => {
    fetchWithdrawSetting();
  }, []);

  useEffect(() => {
    if (withdrawSetting) {
      setInitialValues(formatFromApi(withdrawSetting));
    }
  }, [withdrawSetting]);

  const handleSubmit = async (values) => {
    await updateWithdrawSetting(values);
    await fetchWithdrawSetting();
    setPageMode("view");
  };

  return (
    <>
      <BreadCrumb linkText={[{ text: "Monetary Settings" }, { text: "Withdraw Settings" }]} />
      <PagePath2 title="Withdraw Settings" />

      <div className="bg-white rounded-lg p-6 shadow">
        {pageMode === "view" ? (
          <ViewMode data={initialValues} onEdit={() => setPageMode("edit")} />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {(props) => (
              <EditMode {...props} onCancel={() => setPageMode("view")} />
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

// ----------------------------------------
// VIEW MODE
// ----------------------------------------
function ViewMode({ data, onEdit }) {
  return (
    <div>
      {SECTION_KEYS.map((s) => (
        <Section key={s.key} title={s.title}>
          <FieldView
            label="Amount % of Wallet"
            value={data[s.key].AmountPercentageForWithdraw}
          />

          <FieldView
            label="Days of Month"
            value={data[s.key].daysOfMonthForWithdraw.join(", ")}
          />
        </Section>
      ))}
      <div className="flex justify-center mt-6">
        <Button text="Edit" variant={1} onClick={onEdit} />
      </div>
    </div>
  );
}

// ----------------------------------------
// EDIT MODE
// ----------------------------------------
function EditMode({ values, setFieldValue, errors, touched, onCancel }) {
  return (
    <Form className="space-y-6">
      {SECTION_KEYS.map((s) => (
        <Section key={s.key} title={s.title}>
          <FormField
            label="Amount % of Wallet"
            name={`${s.key}.AmountPercentageForWithdraw`}
            type="text"
            fieldType="input"
            maxLength={3}
            value={values[s.key].AmountPercentageForWithdraw}   // <── CONTROLLED
            onInput={(e) => {
              let v = e.target.value;

              // Remove non-digits
              v = v.replace(/\D/g, "");
              
              // Limit to 3 characters
              if (v.length > 3) v = v.slice(0, 3);
              
              // Prevent values > 100
              if (v !== "" && Number(v) > 100) {
                // If they paste "200", we cap it to "100"
                v = "100";
              }

              // update UI
              e.target.value = v;

              // update Formik
              setFieldValue(`${s.key}.AmountPercentageForWithdraw`, v);
            }}
            onKeyPress={(e) => {
              // Prevent typing if it would exceed 100
              const currentValue = e.target.value;
              const keyPressed = e.key;
              
              // Only allow digits
              if (!/\d/.test(keyPressed)) {
                e.preventDefault();
                return;
              }
              
              // Check if the new value would exceed 100
              const newValue = currentValue + keyPressed;
              if (newValue !== "" && Number(newValue) > 100) {
                e.preventDefault();
              }
            }}
          />


          {/* Days - Using custom DaysInput */}
          <DaysInput
            label="Days Of Month"
            value={values[s.key].daysOfMonthForWithdraw}
            onChange={(arr) =>
              setFieldValue(`${s.key}.daysOfMonthForWithdraw`, arr)
            }
            error={touched?.[s.key]?.daysOfMonthForWithdraw && errors?.[s.key]?.daysOfMonthForWithdraw}
          />
        </Section>
      ))}

      <div className="flex justify-center gap-4">
        <Button text="Cancel" variant={2} type="button" onClick={onCancel} />
        <Button text="Update" variant={1} type="submit" />
      </div>
    </Form>
  );
}

// ----------------------------------------
// CUSTOM DAYS INPUT BOX
// ----------------------------------------
function DaysInput({ label, value = [], onChange, error }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(Array.isArray(value) ? value.join(", ") : "");
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    // Process when user leaves the field
    const arr = inputValue
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "" && !isNaN(v));

    onChange(arr);
    setInputValue(arr.join(", "));
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium text-[#004AAD] mb-1">
        {label}
      </label>
      <input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter days separated by commas (e.g., 1, 15, 30)"
        className="w-full border border-[#CCA547]/80 rounded-lg px-3 py-2 focus:outline-none"
        onWheel={(e) => e.target.blur()}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {Array.isArray(error) ? error.join(", ") : error}
        </span>
      )}
    </div>
  );
}
// ----------------------------------------
function Section({ title, children }) {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function FieldView({ label, value }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <div className="h-11 border border-gray-300 rounded-md px-3 flex items-center bg-white">
        {value}
      </div>
    </div>
  );
}
