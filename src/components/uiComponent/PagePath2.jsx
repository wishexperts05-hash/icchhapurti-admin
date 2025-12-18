import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";

const PagePath2 = ({
  // Title
  title,

  // Search
  showSearch,
  searchTerm,
  handleSearchTerm,
  placeholder = "Search Here",
  inputType = "text",

  // Add Button
  showAddButton,
  addButtonText,
  onClick,
  canCreate = true,

  // Extra Button
  showExtraButton,
  extraButtonText,
  onExtraClick,

  // 3rd Button
  showThirdButton,
  thirdButtonText,
  onThirdClick,

  // Select
  showSelect,
  options = ["Pending", "Approved", "Rejected"],
  selectPlaceHolder = "Select Status",
  onChangeSelectFunc,
  optionsLoading = false,

  // Second Select
  showSecondSelect,
  secondSelectOptions = [],
  secondSelectPlaceholder = "Select Option",
  onChangeSecondSelect,
  secondSelectLoading = false,

  disabled = false,

  // Date Range
  showDateRange = false,
  startDate = "",
  endDate = "",
  onStartDateChange = () => { },
  onEndDateChange = () => { },

}) => {
  return (
    <div className="bg-white p-4 mb-4 border-b rounded-2xl shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold flex-shrink-0">{title}</h2>

        {showSearch && (
          <div className="flex items-center flex-1 min-w-[200px] bg-white border border-gray-300 rounded-lg px-3 py-[8.8px]">
            {/* Icon */}
            <IoSearchOutline className="w-5 h-5 text-gray-400" />

            {/* Vertical line */}
            <div className="h-5 w-px bg-gray-300 mx-2"></div>

            {/* Input */}
            <input
              type={inputType}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchTerm}
            />
          </div>
        )}

        {showSelect && (
          <Select
            options={options?.map((status) => ({
              label: status,
              value: status,
            }))}
            isLoading={optionsLoading}
            placeholder={selectPlaceHolder}
            onChange={onChangeSelectFunc}
            isClearable
            isDisabled={disabled}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: "0.5rem",
                borderColor: state.isFocused ? "#cca547" : "#d1d5db", //border-[#cca547]
                boxShadow: state.isFocused ? "0 0 0 1px #cca547" : "none",
                "&:hover": { borderColor: "#cca547" },
                fontSize: "0.875rem",
                minHeight: "40px",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                zIndex: 9999,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#cca547"
                  : state.isFocused
                    ? "#fee19eff"
                    : "white",
                color: state.isSelected ? "white" : "black",
                "&:active": { backgroundColor: "#fee19eff", color: "white" },
              }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
            }}
          />
        )}

        {showSecondSelect && (
          <Select
            options={secondSelectOptions?.map((option) => ({
              label: option,
              value: option,
            }))}
            isLoading={secondSelectLoading}
            placeholder={secondSelectPlaceholder}
            onChange={onChangeSecondSelect}
            isClearable
            isDisabled={disabled}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: "0.5rem",
                borderColor: state.isFocused ? "#FF6B00" : "#d1d5db",
                boxShadow: state.isFocused ? "0 0 0 1px #FF6B00" : "none",
                "&:hover": { borderColor: "#FF6B00" },
                fontSize: "0.875rem",
                minHeight: "40px",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                zIndex: 9999,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#FF6B00"
                  : state.isFocused
                    ? "#FFE5D1"
                    : "white",
                color: state.isSelected ? "white" : "black",
                "&:active": { backgroundColor: "#FF6B00", color: "white" },
              }),
              placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
            }}
          />
        )}

        {showDateRange && (
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={startDate}
              onChange={onStartDateChange}
              className="bg-white border border-gray-300 rounded-lg px-3 py-[8.8px] text-sm"
              placeholder="Start Date"
            />

            <input
              type="date"
              value={endDate}
              onChange={onEndDateChange}
              className="bg-white border border-gray-300 rounded-lg px-3 py-[8.8px] text-sm"
              placeholder="End Date"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {showAddButton && addButtonText && (
            <button
              onClick={onClick}
              disabled={!canCreate}
              className={`px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-2 ${!canCreate ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>+</span>
              {addButtonText}
            </button>
          )}

          {showExtraButton && extraButtonText && (
            <button
              onClick={onExtraClick}
              disabled={!canCreate}
              className={`px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-2 ${!canCreate ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {extraButtonText}
            </button>
          )}

          {showThirdButton && thirdButtonText && (
            <button
              className={`bg-[#CCA547] text-white px-6 py-[8.8px] rounded-xl 
              flex justify-center items-center gap-2 cursor-pointer 
              font-medium shadow-md 
              transition duration-300
              ${disabled
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : "hover:bg-[#CCA547]/90 hover:shadow-lg"
                }`}
              onClick={disabled ? undefined : onThirdClick}
              disabled={disabled}
              title={disabled ? "No permission to create" : "Create"}
            >
              {thirdButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePath2;