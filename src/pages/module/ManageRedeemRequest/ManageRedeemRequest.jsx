import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Pagination from "../../../components/uiComponent/Pagination";

const ManageRedeemRequest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const data = [
    {
      id: 1,
      name: "Dheeraj Jadhav",
      role: "User",
      bankAccountNo: "178945875012",
      walletBalance: "₹2499",
      redeemRequestAmount: "₹2499",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sahai Meena",
      role: "Staff",
      bankAccountNo: "178945875012",
      walletBalance: "₹2499",
      redeemRequestAmount: "₹2499",
      status: "Pending",
    },
    {
      id: 3,
      name: "Raeesh Khan",
      role: "User",
      bankAccountNo: "178945875012",
      walletBalance: "₹2499",
      redeemRequestAmount: "₹2499",
      status: "Approved",
    },
    {
      id: 4,
      name: "Devendra Sharma",
      role: "Staff",
      bankAccountNo: "178945875012",
      walletBalance: "₹2499",
      redeemRequestAmount: "₹2499",
      status: "Approved",
    },
    {
      id: 5,
      name: "Anil Pabbi Ap",
      role: "User",
      bankAccountNo: "178945875012",
      walletBalance: "₹2499",
      redeemRequestAmount: "₹2499",
      status: "Rejected",
    },
  ];

  const columns = [
    { header: "name", field: "name" },
    { header: "role", field: "role" },
    { header: "bankAccountNo", field: "bankAccountNo" },

    { header: "walletBalance", field: "walletBalance" },
    { header: "redeemRequestAmount", field: "redeemRequestAmount" },
    { header: "status", field: "status" },
    { header: "Action", field: "action" },
  ];

  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Manage Redeem Request" }]} />
      <PagePath2 title="Manage Redeem Request" showSearch />
      <Box>
        <DataTable
          columns={columns}
          data={data}
          currentPage={1}
          usersPerPage={5}
          actions={[
            {
              icon: <FiEye className="w-5 h-5 text-[#CCA547]" />,
              title: "View",
              onClick: (row) => {
                navigate(`/manage-redeem-request/view-redeem-request`);
              },
              className: "hover:bg-blue-100 hover:text-[#004AAD]",
            },
          ]}
        />
      </Box>
      <Pagination
        currentPage={page}
        totalPages={10}
        totalItems={12}
        itemsPerPage={10}
        // onPageChange={setCurrentPage}
        // onItemsPerPageChange={setItemsPerPage}
      />
    </Box>
  );
};

export default ManageRedeemRequest;
