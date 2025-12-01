
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { useState } from "react";
import Button from "../../../components/uiComponent/Button";


const FormInput = ({ label, id, icon: Icon, ...props }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200"
        {...props}
      />
      {Icon && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const FormSelect = ({ label, id, options, value, onChange }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-[#CCA547] focus:border-transparent transition duration-200
                 bg-white appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem'
      }}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
const SetTargetManagement = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dailyQuantity: "",
    weaklyQuantity: "",
    ticketOnWeaklyTarget: "",
    ticketAboveWeaklyTarget: "",
    giveTicket: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new staff:", formData);
    alert("Target added successfully!");
    navigate("/target-management");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    navigate("/target-management");
  };

  return (
    <>
      <BreadCrumb
        linkText={[
          { text: "Target Management", href: "/target-management" },
          { text: "Set Target" },
        ]}
      />

      <PagePath2
        title="Set Target"

      />

      <div className="bg-white p-4 mb-4 border-b rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="w-full  max-w-[1200px]">

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            <FormInput
              label="Daily Quantity :"
              id="dailyQuantity"
              type="number"
              // value=""
              onChange={handleChange}
              placeholder="Daily Quantity"
              required
            />
            <FormInput
              label="Weakly Quantity :"
              id="weaklyQuantity"
              type="number"
              // value=""
              onChange={handleChange}
              placeholder="Enter weakly quantity"
              required
            />
            <FormInput
              label="Give ticket on weakly target :"
              id="dailyQuantity"
              type="number"
              // value=""
              onChange={handleChange}
              placeholder="Give ticket on weakly target"
              required
            />
            <FormInput
              label="Quantity above the weakly target :"
              id="dailyQuantity"
              type="number"
              // value=""
              onChange={handleChange}
              placeholder="Quantity above the weakly target"
              required
            />
            <FormInput
              label="Give ticket :"
              id="dailyQuantity"
              type="number"
              // value=""
              onChange={handleChange}
              placeholder="Give ticket"
              required
            />

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <div className="flex justify-center gap-8 mt-8 mb-8 ">
              <Button text="Cancel" variant={2} onClick={handleCancel} />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-center gap-8 mt-8 mb-8 ">
              <Button text="Save" variant={1} onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SetTargetManagement;