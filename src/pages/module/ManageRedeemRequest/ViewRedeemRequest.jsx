import {
  Box,
  Typography,
  // Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import { useParams } from "react-router-dom";
import useManageRedeemRequest from "../../../hooks/ManageRedeemRequest/useManageRedeemRequest";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import DetailsField from "../../../components/uiComponent/DetailsField";
import { toast } from "react-toastify";
import { ClassNames } from "@emotion/react";

const RejectRequestModal = ({ open, onClose, onSave }) => {
  const [reason, setReason] = React.useState("");

  // Handle modal close and reset reason
  const handleClose = () => {
    setReason(""); // Clear the reason input
    onClose(); // Close the modal
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize="18px" fontWeight={600}>
          Reason For Rejecting Request :
        </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          multiline
          rows={8}
          fullWidth
          placeholder="Write your reason here..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        {/* Buttons */}
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button variant={2} onClick={handleClose} text="Cancel" />
          <Button
            variant={1}
            onClick={() => {
              if (reason) {
                onSave(reason);
              } else {
                toast.warning("Enter Reason For Rejecting Request ");
              }
            }}
            text="Reject"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ViewRedeemRequest = () => {
  const { id } = useParams();
  const [openReject, setOpenReject] = useState(false);
  const navigate = useNavigate();

  const { loading, fetchRedeemRequestDetails, redeemRequestsDetails, updateRedeemRequestStatus } =
    useManageRedeemRequest();

  useEffect(() => {
    fetchRedeemRequestDetails(id);
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
    setOpenReject(false); // Close the modal if it's open
  };

  const handleRejectReject = (status, reason) => {
    updateRedeemRequestStatus(id, status, reason);
    setStatus(""); // Reset any other states if needed
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

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoaderSpinner />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: "#ffffff",
              border: "1px solid #E0E0E0",
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
              }}
            ></Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 3,
                p: 2,
                width: "100%",
                marginTop: "-40px",
              }}
            >
              <DetailsField label="Name :" value={redeemRequestsDetails.name || "-"} />
              <DetailsField label="Role :" value={redeemRequestsDetails.role || "-"} />
              <DetailsField label="Balance :" value={redeemRequestsDetails.walletBalance || "-"} />
              <DetailsField label="Redeem Request Amount :" value={redeemRequestsDetails.redeemRequestAmount || "-"} />
              <DetailsField label="Bank Name :" value={redeemRequestsDetails.bankName || "-"} />
              <DetailsField label="Bank Account Number :" value={redeemRequestsDetails.bankAccount || "-"} />
              <DetailsField label="IFSC Code :" value={redeemRequestsDetails.ifscCode || "-"} />
              <DetailsField label="Account Holder Name :" value={redeemRequestsDetails.accountHolderName || "-"} />
              <DetailsField label="Status by SubAdmin :" color={redeemRequestsDetails.statusBySubAdmin === "Approved" ? "green" : "red"} value={redeemRequestsDetails.statusBySubAdmin || "-"} />
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
            <Button text="Back" variant={2} onClick={handleBack} />
            <Button
              variant={4}
              text="Reject"
              onClick={() => setOpenReject(true)} // Directly open the modal
            />
            <Button variant={3} text="Approve" onClick={() => handleRejectReject("Approved")} />
          </Box>
        </>
      )}
      <RejectRequestModal
        open={openReject}
        onClose={() => setOpenReject(false)} // Close the modal when onClose is triggered
        onSave={(reason) => {
          setOpenReject(false); // Close the modal after saving
          handleRejectReject("Rejected", reason); // Handle rejection logic
        }}
      />
    </Box>
  );
};

export default ViewRedeemRequest;

