// 📂 components/DataTable.jsx
const DataTable = ({
  columns,
  data,
  actions = [],
  currentPage = 1,
  usersPerPage = 5,
}) => {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="bg-blue-300  ">
          {columns.map((col, index) => (
            <th key={index} className="px-4  text-gray-800 py-2 min-w-[80px]">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row.id || rowIndex}
            className="bg-white shadow-sm rounded-xl hover:bg-blue-50 transition-colors duration-200"
          >
            {columns.map((col, colIndex) => {
              const value = row[col.field];

              // ✅ Status column with colors
              if (col.field === "status") {
                let colorClass = "";
                switch (value) {
                  case "Approved":
                  case "Active":
                  case "Confirmed":
                  case "Paid":
                    colorClass = "text-green-600";
                    break;
                  case "Pending":
                    colorClass = "text-yellow-500";
                    break;
                  case "Rejected":
                  case "Blocked":
                  case "Canceled":
                    colorClass = "text-red-600";
                    break;
                  default:
                    colorClass = "";
                }
                return (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 align-middle font-medium ${colorClass}`}
                  >
                    {value}
                  </td>
                );
              }

              // ✅ Action column
              if (col.field === "action") {
                return (
                  <td
                    key={colIndex}
                    className="px-4 py-3 align-middle h-[80px]"
                  >
                    <div className="flex gap-3 justify-center">
                      {actions.map((action, idx) => {
                        // Dynamic button styles
                        let buttonBg = "";
                        let textColor = "";
                        if (row.status === "Pending") {
                          buttonBg = "bg-[#004AAD]";
                          textColor = "text-white";
                        } else if (row.status === "Paid") {
                          buttonBg = "bg-gray-400";
                          textColor = "text-white";
                        } else {
                          buttonBg = "bg-gray-200";
                          textColor = "text-black";
                        }

                        // ✅ Case 1: Only icon (no button)
                        if (action.icon && !action.label) {
                          return (
                            <button
                              key={idx}
                              title={action.title}
                              className="p-2 rounded hover:bg-blue-100 hover:text-[#004AAD] transition"
                              onClick={() => action.onClick?.(row)}
                            >
                              {action.icon}
                            </button>
                          );
                        }

                        // ✅ Case 2: Button (with or without icon + label)
                        return (
                          <button
                            key={idx}
                            title={action.title}
                            className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${buttonBg} ${textColor}`}
                            onClick={() => action.onClick?.(row)}
                          >
                            {action.icon && (
                              <span className="flex items-center">
                                {action.icon}
                              </span>
                            )}
                            {action.label && <span>{action.label}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                );
              }

              // ✅ Normal column
              return (
                <td
                  key={colIndex}
                  className={`px-4 py-3 align-middle ${
                    col.field === "address"
                      ? "whitespace-normal break-words text-center truncate max-w-[300px]"
                      : ""
                  }`}
                >
                  {col.field === "srNo"
                    ? rowIndex + 1 + (currentPage - 1) * usersPerPage
                    : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
