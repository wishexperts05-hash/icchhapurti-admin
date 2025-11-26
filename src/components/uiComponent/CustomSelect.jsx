export default function CustomSelect({  value, onChange, options, className }) {
  return (
    <div className="flex flex-col gap-1">
      <select
        value={value}
        onChange={onChange}
        className={`w-48 px-3 py-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white 
          text-sm ${className}`}
      >
        

        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
