import {
  Box,
  Divider,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import PenProduct from "../../../assets/PenProduct.png";
import { href } from "react-router-dom";

const OrderDetails = () => {
  const steps = [
    {
      label: "Select campaign settings",
      description: `For show on, and more.`,
    },
    {
      label: "Create an ad group",
      description: "An ad gs.",
    },
    {
      label: "Create an ad",
      description: `Try .`,
    },
  ];

  const priceDetails = [
    { field: "Price", value: "2499" },
    { field: "Discount", value: "500" },
    { field: "Referral", value: "50" },
    { field: "Platform Fee", value: "1" },
    { field: "Debit Card Off", value: "1000" },
    { field: "Delivery Charges", value: "50" },
  ];

  return (
    <Box sx={{ background: "white", padding: 2 }}>
      <BreadCrumb
        linkText={[
          { text: "Order Management", href: "/order-management" },
          { text: "View Order" },
        ]}
      />
      <PagePath2 title="Order Details" />
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 3 }}
      >
        {/* Box 1 */}
        <Box
          sx={{
            width: 800,
            height: 500,
            border: "1px solid #EEC1BB",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            src={PenProduct}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        {/* Box 2 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            paddingTop: 5,
            paddingX: 2,
            background: "#F7F7F7",
            borderRadius: 2,
            border: "1px solid #C6C7C9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              borderBottom: "1.5px solid black",
              maxWidth: "50%",
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
            <Typography fontWeight="Bold">Order Information</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 6,
            }}
          >
            <Typography fontWeight="Bold">Order ID :</Typography>
            <Typography>014578</Typography>
            <Typography fontWeight="Bold">Product Category :</Typography>
            <Typography>Pen</Typography>
            <Typography fontWeight="Bold">Product Name :</Typography>
            <Typography>Uni-ball</Typography>
            <Typography fontWeight="Bold">Price :</Typography>
            <Typography>₹ 10</Typography>
            <Typography fontWeight="Bold">Order Date & Time :</Typography>
            <Typography>10/05/2025 11:00 AM</Typography>
            <Typography fontWeight="Bold">Product Description :</Typography>
          </Box>
        </Box>
        {/* Box 3 */}
        <Box
          sx={{
            border: "1px solid #C6C7C9",
            width: "100%",
            padding: 5,
            borderRadius: 2,
            boxSizing: "border-box",
          }}
        >
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} active>
                <StepLabel>
                  {" "}
                  <Typography sx={{ color: "#CCA547", fontWeight: "bold" }}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* Box 4 */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Table sx={{ border: "1px solid #EEC1BB" }}>
            <TableHead sx={{ background: "#F7F7F7" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Product Category
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Pen</TableCell>
                <TableCell>Piolet</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: "1px solid #C6C7C9",
          marginTop: 3,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h6">Price Details</Typography>
        <Divider variant="fullWidth" sx={{ background: "#C6C7C9" }} />
        {priceDetails.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>{item.field}</Typography>
            <Typography>₹{item.value}</Typography>
          </Box>
        ))}

        <Divider variant="fullWidth" sx={{ border: " 1px dashed #C6C7C9" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="bold">Total Amount</Typography>
          <Typography fontWeight="bold">₹ 19000</Typography>
        </Box>
        <Divider variant="fullWidth" sx={{ border: " 1px dashed #C6C7C9" }} />
        <Typography variant="body1" color="#CCA547">
          Total saved on this order ₹ 700
        </Typography>
        <Divider variant="fullWidth" sx={{ border: " 1px dashed #C6C7C9" }} />
        <Typography>Payment Mode: Debit Card</Typography>
      </Box>
    </Box>
  );
};

export default OrderDetails;
