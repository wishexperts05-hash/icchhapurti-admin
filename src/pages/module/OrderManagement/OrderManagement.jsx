import React from "react";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import { Box } from "@mui/material";
import DataTable from "../../../components/uiComponent/DataTable";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const OrderManagement = () => {
  const data = [
    {
      orderId: "OI6798",
      userName: "Dheeraj Jadhav",
      userRole: "Staff",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Delivered",
    },
    {
      orderId: "OI9743",
      userName: "Raeesh Khan",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 2,
      orderDate: "10/11/2025",
      status: "Pending",
    },
    {
      orderId: "OI9834",
      userName: "Dheeraj Jadhav",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Returned",
    },
    {
      orderId: "OI1234",
      userName: "Sahai Meena",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Processing",
    },
    {
      orderId: "OI7850",
      userName: "Raeesh Khan",
      userRole: "Staff",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Cancelled",
    },
    {
      orderId: "OI6852",
      userName: "Sahai Meena",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Returned",
    },
    {
      orderId: "OI0689",
      userName: "Dheeraj Jadhav",
      userRole: "Staff",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Delivered",
    },
    {
      orderId: "OI5548",
      userName: "Raeesh Khan",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 1,
      orderDate: "10/11/2025",
      status: "Pending",
    },
    {
      orderId: "OI6978",
      userName: "Dheeraj Jadhav",
      userRole: "User",
      items: ["1 Ball-Pen", "2 Parker Pen"],
      quantity: 2,
      orderDate: "10/11/2025",
      status: "Processing",
    },
  ];
  const columns = [
    { header: "order Id", field: "orderId" },
    { header: "user Name", field: "userName" },
    { header: "user Role", field: "userRole" },
    {
      header: "Items",
      field: "items",
      render: (row) => row.items.join(", "),
    },
    { header: "quantity", field: "quantity" },
    { header: "order Date", field: "orderDate" },
    { header: "status", field: "status" },
    { header: "Action", field: "action" },
  ];

  return (
    <Box sx={{ background: "white", padding: 2 }}>
      <BreadCrumb linkText={[{ text: "Order Management" }]} />
      <PagePath2 title="Order Management" />

      <Box>
        <DataTable
          columns={columns}
          data={data}
          currentPage={1}
          usersPerPage={5}
          actions={[
            {
              icon: <FiEye className="w-5 h-5 text-[#FF6B00]" />,
              title: "View",
              onClick: (row) => {
                // navigate(`/pg-hostel-owner/hostel-owner-details/${row._id}`);
              },
              className: "hover:bg-blue-100 hover:text-[#004AAD]",
            },
            {
              icon: <FaRegEdit className="w-5 h-5 text-[#FF6B00]" />,
              title: "Edit",
              onClick: (row) => {
                // navigate(`/pg-hostel-owner/edit-hostel-owner/${row._id}`);
              },

              className: "hover:bg-blue-100 hover:text-[#004AAD]",
            },
            {
              icon: <FiTrash2 className="w-5 h-5 text-[#FF6B00]" />,
              title: "Delete",
              onClick: (row) => {
                // handleDelete(row?._id);
              },
              className: "hover:bg-blue-100 hover:text-[#004AAD]",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default OrderManagement;
