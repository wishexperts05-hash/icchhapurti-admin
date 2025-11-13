import { Box, Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";

const ViewRedeemRequest = () => {
  const userData = {
    name: "Dheeraj Jadhav",
    role: "User",
    walletBalance: 2499,
    redeemRequestAmount: 1000,
    bankName: "State Bank Of India",
    bankAccountNumber: "457894512075",
    ifscCode: "SBI0478",
    accountHolderName: "Dheeraj Jadav",
    statusBySubAdmin: "Approved",
  };

  return (
    <Box>
      <BreadCrumb
        linkText={[
          { text: "Manage Redeem Request", href: "/manage-redeem-request" },
          { text: "View Redeem Request" },
        ]}
      />
      <PagePath2 title="View Redeem Request" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "#FFFFFF",
          boxShadow:
            "4px 4px 8px rgba(0,0,0,0.2), -4px 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
          }}
        >
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0H0V6H1V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V6H20V0ZM2 2H18V4H2V2ZM17 17H3V6H17V17ZM7 8H13C13 8.53043 12.7893 9.03914 12.4142 9.41421C12.0391 9.78929 11.5304 10 11 10H9C8.46957 10 7.96086 9.78929 7.58579 9.41421C7.21071 9.03914 7 8.53043 7 8Z"
              fill="#262626"
            />
          </svg>
          <Typography fontWeight="bold">Redeem Request</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 3,
            p: 2,
            width: "40%",
          }}
        >
          <Typography fontWeight="bold">Name :</Typography>
          <Typography>{userData.name}</Typography>
          <Typography fontWeight="bold">Role :</Typography>
          <Typography>{userData.role}</Typography>
          <Typography fontWeight="bold">Wallet Balance :</Typography>
          <Typography>{userData.walletBalance}</Typography>
          <Typography fontWeight="bold">Redeem Request Amount :</Typography>
          <Typography>{userData.redeemRequestAmount}</Typography>
          <Typography fontWeight="bold">Bank Name :</Typography>
          <Typography>{userData.bankName}</Typography>
          <Typography fontWeight="bold">Bank Account Number :</Typography>
          <Typography>{userData.bankAccountNumber}</Typography>
          <Typography fontWeight="bold"> IFSC Code :</Typography>
          <Typography>{userData.ifscCode}</Typography>
          <Typography fontWeight="bold">Account Holder Name :</Typography>
          <Typography>{userData.accountHolderName}</Typography>
          <Typography fontWeight="bold">Status By SubAdmin</Typography>
          <Typography
            sx={{
              color: userData.statusBySubAdmin === "Approved" ? "green" : "red",
            }}
          >
            {userData.statusBySubAdmin}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          margin: 3,
        }}
      >
        <Button variant={2} text="Reject" />
        <Button variant={3} text="Approve" />
      </Box>
    </Box>
  );
};

export default ViewRedeemRequest;
