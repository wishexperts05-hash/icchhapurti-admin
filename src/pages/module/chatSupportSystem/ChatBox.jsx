import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { href, useLocation, useParams } from "react-router-dom";
import useChatSystemSuport from "../../../hooks/chatSupportSystem/chatSupportSystem";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState([]);
  const { conversationId } = useParams();
  const [userProfile, setUserProfile] = useState([]);
  const [adminProfile, setAdminProfile] = useState([]);
  const { state } = useLocation();
  const [text, setText] = useState("");

  const { fetchConversationById, loading, sendMessage } = useChatSystemSuport();

  console.log("Conversation ID:", conversationId);
  useEffect(() => {
    const load = async () => {
      const result = await fetchConversationById(conversationId);
      setMessages(result.messages);
      if (result.messages.length > 0) {
        setUsername(result.messages[0].name);
        setParticipants(result.conversation.participants);
        setUserProfile(result.messages[0].image);
        setAdminProfile(result.messages[1].image);
      }
    };
    load();
  }, []);
  console.log("Messages:", messages);
  console.log("Username:", username);
  console.log("Participants:", participants);

  const handleSend = async () => {
    if (!text.trim()) return;

    const user = participants.find((p) => p.userType === "User");

    const receiverId = user?.userId; // ALWAYS User ID
    const receiverType = "User"; // because admin is sending

    const res = await sendMessage({
      receiverId,
      receiverType,
      message: text,
    });

    if (res) {
      // Add outgoing message to UI
      setMessages((prev) => [
        ...prev,
        {
          msg: text,
          type: "outgoing",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setText("");
    }
  };

  return (
    <Box>
      <BreadCrumb
        linkText={[
          { text: "Chat Support System", href: "/chat-support-system" },
          { text: "Chat " },
        ]}
      />
      <PagePath2 title="Chat " />
      <div>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (
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
                  <img
                    src={userProfile}
                    alt="profile"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      borderRadius: "50%", // makes it circular
                    }}
                  />
                </Box>
                <Typography fontWeight="bold">{username} </Typography>
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
                {/* <Chip label="Resolved" color="success" />
                <Chip label="Pending" color="default" /> */}
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
                {messages.map((item, index) => (
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
                      {item.type === "incoming" && (
                        <img
                          src={userProfile}
                          alt="profile"
                          style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                            borderRadius: "50%", // makes it circular
                          }}
                        />
                      )}

                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 1.5,
                          borderRadius: 2,
                          bgcolor:
                            item.type === "incoming" ? "#ffffff" : "#7879F1",
                          color:
                            item.type === "incoming" ? "#7879F1" : "#ffffff",
                          border:
                            item.type === "incoming"
                              ? "1px solid #7879F1"
                              : "#ffffff",

                          fontSize: "14px",
                        }}
                      >
                        {item.msg}
                      </Box>
                      {item.type === "outgoing" && (
                        <img
                          src={adminProfile}
                          alt="admin"
                          style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      )}
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
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  size="small"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <Box
                  sx={{
                    background: "#5D5FEF",
                    p: 1.5,
                    boxSizing: "border-box",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  onClick={handleSend}
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
        )}
      </div>
    </Box>
  );
};

export default ChatBox;
