function DetailsField({ label, value, type = "text", className = "", valueColor = "inherit", valueWeight = "normal" }) {
  // Check if value is a React component (JSX element)
  const isComponent = value && typeof value === 'object' && value.$$typeof;

  if (isComponent) {
    // Render as component (e.g., Chips, JSX)
    return (
      <div className="flex flex-col w-full gap-1">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <div className={`bg-white border border-gray-300 rounded-[8px] px-4 py-3 ${className}`}>
          {value}
        </div>
      </div>
    );
  }

  // Render as text block so long values (email, address) wrap naturally
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div
        className={`bg-white border border-gray-300 rounded-[8px] px-4 py-3 ${className}`}
        style={{ color: valueColor, fontWeight: valueWeight, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}

export default DetailsField;
