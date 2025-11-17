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
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import { useParams } from "react-router-dom";
import useManageRedeemRequest from "../../../hooks/ManageRedeemRequest/useManageRedeemRequest";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import { toast } from "react-toastify";

const RejectRequestModal = ({ open, onClose, onSave }) => {
  const [reason, setReason] = React.useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          <Button variant={2} onClick={onClose} text="Cancel" />
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

  const { loading, fetchRedeemRequestDetails, redeemRequestsDetails } =
    useManageRedeemRequest();
  const { updateRedeemRequestStatus } = useManageRedeemRequest();

  useEffect(() => {
    fetchRedeemRequestDetails(id);
  }, [id]);

  const handleRejectReject = (status, reason) => {
    updateRedeemRequestStatus(id, status, reason);
    setStatus("");
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
          {" "}
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
              <Typography>{redeemRequestsDetails.name || "-"}</Typography>
              <Typography fontWeight="bold">Role :</Typography>
              <Typography>{redeemRequestsDetails.role || "-"}</Typography>
              <Typography fontWeight="bold">Wallet Balance :</Typography>
              <Typography>
                {redeemRequestsDetails.walletBalance || "-"}
              </Typography>
              <Typography fontWeight="bold">Redeem Request Amount :</Typography>
              <Typography>
                {redeemRequestsDetails.redeemRequestAmount || "-"}
              </Typography>
              <Typography fontWeight="bold">Bank Name :</Typography>
              <Typography>{redeemRequestsDetails.bankName || "-"}</Typography>
              <Typography fontWeight="bold">Bank Account Number :</Typography>
              <Typography>
                {redeemRequestsDetails.bankAccountNumber || "-"}
              </Typography>
              <Typography fontWeight="bold"> IFSC Code :</Typography>
              <Typography>{redeemRequestsDetails.ifscCode || "-"}</Typography>
              <Typography fontWeight="bold">Account Holder Name :</Typography>
              <Typography>
                {redeemRequestsDetails.accountHolderName || "-"}
              </Typography>
              <Typography fontWeight="bold">Status By SubAdmin</Typography>
              <Typography
                sx={{
                  color:
                    redeemRequestsDetails.statusBySubAdmin === "Approved"
                      ? "green"
                      : "red",
                }}
              >
                {redeemRequestsDetails.statusBySubAdmin || "-"}
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
            <Button
              variant={4}
              text="Reject"
              onClick={() => setOpenReject((prev) => !prev)}
            />
            <Button
              variant={3}
              text="Approve"
              onClick={() => {
                handleRejectReject("Approved");
              }}
            />
          </Box>
        </>
      )}
      <RejectRequestModal
        open={openReject}
        onClose={() => setOpenReject(false)}
        onSave={(reason) => {
          setOpenReject(false);
          handleRejectReject("Rejected", reason);
        }}
      />
    </Box>
  );
};

export default ViewRedeemRequest;
