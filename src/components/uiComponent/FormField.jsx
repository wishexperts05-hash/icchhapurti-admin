import React from "react";
import { useFormikContext } from "formik";
import ReactSelect from "react-select";
import { Bold } from "lucide-react";

export default function FormField({
  label,
  name,
  type = "text", // for input
  fieldType = "input", // "input" | "select"
  placeholder,
  options = [],
  loading = false,
  isMulti = false,
  readOnly,
  autoComplete = "on",
  disabled = false,
  rightElement,
  onChange,
  isClearable = false,
}) {
  const formik = useFormikContext();

  const getNestedValue = (path, obj) =>
    path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  const value = getNestedValue(name, formik.values);
  const touched = getNestedValue(name, formik.touched);
  const error = getNestedValue(name, formik.errors);

  const selectOptions = Array.isArray(options)
    ? options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    )
    : [];

  const selectedOption = isMulti
    ? selectOptions.filter(
      (opt) => Array.isArray(value) && value.includes(opt.value)
    )
    : selectOptions.find((opt) => opt.value === value) || null;

  const inputValue =
    type === "date" && value instanceof Date
      ? value.toISOString().split("T")[0]
      : value ?? "";

  return (
    <div className="flex flex-col    mb-4">
      {/* Show label above input or next to checkbox */}
      {fieldType === "input" && type === "checkbox" ? (
        <label className="flex items-center gap-2 cursor-pointer select-none ">
          <input
            id={name}
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={(e) => formik.setFieldValue(name, e.target.checked)}
            onBlur={formik.handleBlur}
            className="hidden" // hide native checkbox
          />
          <span
            className={`w-full flex items-center justify-center rounded-md border-2 border-orange-500
        w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 
        ${value ? "bg-orange-500" : "bg-white"}`}
          >
            {value && (
              <svg
                className="w-3/4 h-3/4 sm:w-4/5 sm:h-4/5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="6" fill="#FA8200" />
                <path
                  d="M6 10l3 3.5L14 7"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </span>
          {label && (
            <span className="text-sm sm:text-base break-words">{label}</span>
          )}
        </label>
      ) : fieldType === "input" && type !== "textarea" ? (
        <>
          <label
            htmlFor={name}
            className="text-sm font-medium text-[#004AAD] mb-1 "
          >
            {label}
          </label>
          <div className="relative w-full  ">
            <input
              id={name}
              type={type}
              name={name}
              autoComplete={autoComplete}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              value={inputValue}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                if (type === "number") {
                  const numValue =
                    e.target.value === "" ? "" : Number(e.target.value);
                  formik.setFieldValue(name, isNaN(numValue) ? "" : numValue);
                } else if (type === "date") {
                  formik.setFieldValue(
                    name,
                    e.target.value ? new Date(e.target.value) : ""
                  );
                } else {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              className="w-full border border-[#CCA547]/80 rounded-lg px-3 py-2 focus:outline-none"
            />
            {rightElement && (
              <div
                className="
      absolute 
      left-[2px] right-[2px] top-[2px] bottom-[2px]
      rounded-md
      pointer-events-none
      flex items-center pl-3
      bg-white
      z-10
    "
              >
                {rightElement}
              </div>
            )}

          </div>

        </>
      ) : fieldType === "input" && type === "textarea" ? (
        <>
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-[#CCA547]/80 rounded-lg px-3 py-2 focus:outline-none"
          />
        </>
      ) : (
        <>
         
          <ReactSelect
            options={selectOptions}
            isLoading={loading}
            name={name}
            value={selectedOption}
            isClearable={isClearable}
            onChange={(selected) => {
              if (isMulti) {
                formik.setFieldValue(
                  name,
                  selected ? selected.map((opt) => opt.value) : []
                );
              } else {
                formik.setFieldValue(name, selected?.value || "");
              }
              if (typeof onChange === "function") {
                onChange(selected);
              }
            }}
            onBlur={() => formik.setFieldTouched(name, true)}
            placeholder={`${label}`}
            classNamePrefix="react-select"
            isDisabled={disabled || loading}
            isMulti={isMulti}
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "44px",
                borderRadius: "0.5rem",
                borderColor: state.isFocused
                  ? "#f4920aff"
                  : touched && error
                    ? "#EF4444"
                    : "#bbbab7ff",
                boxShadow: state.isFocused ? "0 0 0 2px #f4920aff" : "none",  // Changed from 2px to 1px
                "&:hover": {
                  borderColor: state.isFocused
                    ? "#f4920aff"
                    : touched && error
                      ? "#EF4444"
                      : "#bbbab7ff",
                }
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 6px",
                fontSize: "0.95rem",
                fontFamily: "Inter",
                color: "black"
              }),
            option: (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? "#f4920aff !important"
    : state.isFocused
    ? "white !important"
    : "white",
  color: state.isSelected ? "white" : "#111827",
  cursor: "pointer",
  ":active": {
    backgroundColor: "#FEF3C7 !important",
  },
  ":hover": {
    backgroundColor: "#FEF3C7 !important",
  },
}),
            }}
          />
        </>
      )}

      {touched && error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
}
