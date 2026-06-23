import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import useChatSystemSuport from "../../../hooks/chatSupportSystem/chatSupportSystem";
import { useNavigate } from "react-router-dom";

const ChatSupportSystem = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    fetchAllChatConversations,
    chatSupportList,
    loading,
  } = useChatSystemSuport();

  // Fetch conversations when page loads
  useEffect(() => {
    fetchAllChatConversations(searchTerm);
  }, [searchTerm]);

  // Map API response → table rows
  const mappedData =
    chatSupportList?.map((item, index) => ({
      srNo: index + 1,
      conversationId: item?.conversationId || "N/A",
      userId: item?.receiverId || "N/A",
      userName: item?.receiverName || "N/A",
      issueDetails: item?.lastMessage || "No message",
      dateIssue: new Date(item.lastMessageAt).toLocaleDateString() || "N/A",
      status: item?.status || "Pending",
      action: item,
    })) || [];

  const columns = [
    { header: "Sr. No.", field: "srNo" },
    { header: "User Name", field: "userName" },
    { header: "Issue Details", field: "issueDetails" },
    { header: "Date Issue", field: "dateIssue" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Chat Support System" }]} />
      <PagePath2 title="Chat Support System" showSearch searchTerm={searchTerm}
        handleSearchTerm={handleSearchTermChange} />

      <DataTable
        columns={columns}
        data={mappedData}
        loading={loading}
        currentPage={1}
        usersPerPage={10}
        actions={[
          {
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 13C19 13.5304 18.7893 14.0391 18.4142 14.4142C18.0391 14.7893 17.5304 15 17 15H5L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V13Z"
                  stroke="#34C759"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "View",
            onClick: (row) => {
              navigate(`/chat-support-system/chatbox/${row.conversationId}`, { state: { conversationId: row.conversationId } });
            },
          },
        ]}
      />

      <Pagination
        currentPage={1}
        totalPages={1}
        totalItems={mappedData.length}
        itemsPerPage={10}
      />
    </Box>
  );
};

export default ChatSupportSystem;
