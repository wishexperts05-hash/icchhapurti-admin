import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { href } from "react-router-dom";

const ChatBox = () => {
  const data = [
    {
      id: 1,
      type: "incoming",
      time: "10:15 AM",
      msg: "Hey! How are you?",
    },
    {
      id: 2,
      type: "outgoing",
      time: "10:17 AM",
      msg: "I'm good! What about you?",
    },
    {
      id: 3,
      type: "incoming",
      time: "10:18 AM",
      msg: "I'm doing great. Did you check the update?",
    },
    {
      id: 4,
      type: "outgoing",
      time: "10:20 AM",
      msg: "Yes, I checked it. Looks perfect!",
    },
    {
      id: 5,
      type: "incoming",
      time: "10:22 AM",
      msg: "Nice! Let's proceed then.",
    },
  ];

  return (
    <Box>
      <BreadCrumb
        linkText={[
          { text: "Chat Support System", href: "/chat-support-system" },
          { text: "Chat " },
        ]}
      />
      <PagePath2 title="Chat " />
      <Box
        sx={{
          // background: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          // padding: 1,
        }}
      >
        <Box
          sx={{
            padding: 3,
            border: "1px solid #DFE0EB",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Box sx={{}}>
              <img src="" alt="img" />
            </Box>
            <Typography fontWeight="bold">Pratik </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chip label="Resolved" color="success" />
            <Chip label="Pending" color="default" />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 350px)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              paddingRight: 1,
              scrollbarWidth: "thin",
            }}
          >
            {data.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      item.type === "incoming" ? "flex-start" : "flex-end",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {item.type === "incoming" && <img src="" alt="1" />}

                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: 1.5,
                      borderRadius: 2,
                      bgcolor: item.type === "incoming" ? "#ffffff" : "#7879F1",
                      color: item.type === "incoming" ? "#7879F1" : "#ffffff",
                      border:
                        item.type === "incoming"
                          ? "1px solid #7879F1"
                          : "#ffffff",

                      fontSize: "14px",
                    }}
                  >
                    {item.msg}
                  </Box>
                  {item.type === "outgoing" && <img src="" alt="1" />}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      item.type === "incoming" ? "flex-start" : "flex-end",
                    pl: item.type === "incoming" ? 5 : 0,
                    pr: item.type === "outgoing" ? 5 : 0,
                  }}
                >
                  <Typography variant="subtitle2">{item.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #ccc",
              paddingY: 2,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <TextField fullWidth placeholder="Type a message..." size="small" />
            <Box
              sx={{
                background: "#5D5FEF",
                p: 1.5,
                boxSizing: "border-box",
                borderRadius: 2,
              }}
            >
              <svg
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0107555 20.25L22.5865 10.125L0.0107555 0L0 7.875L16.1332 10.125L0 12.375L0.0107555 20.25Z"
                  fill="white"
                />
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
