import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import DataTable from "../../../components/uiComponent/DataTable";
import Pagination from "../../../components/uiComponent/Pagination";
import { useNavigate } from "react-router-dom";
const ChatSupportSystem = () => {
  const navigate = useNavigate();
  const data = [
    {
      srNo: 1,
      userId: "UI457",
      userName: "Dheeraj Jadhav",
      issueDetails: "Lorem Ipsum has been the text",
      dateIssue: "Today",
      status: "Resolved",
    },
    {
      srNo: 2,
      userId: "UI452",
      userName: "Wade Warren",
      issueDetails: "Lorem Ipsum has been the text",
      dateIssue: "Today",
      status: "Resolved",
    },
    {
      srNo: 3,
      userId: "UI453",
      userName: "Raeesh Khan",
      issueDetails: "Lorem Ipsum has been the text",
      dateIssue: "Today",
      status: "Resolved",
    },
    {
      srNo: 4,
      userId: "UI454",
      userName: "Devendra Sharma",
      issueDetails: "Lorem Ipsum has been the text",
      dateIssue: "Today",
      status: "Resolved",
    },
    {
      srNo: 5,
      userId: "UI455",
      userName: "Anil Pabbi Ap",
      issueDetails: "Lorem Ipsum has been the text",
      dateIssue: "10 Jan 2025",
      status: "Pending",
    },
  ];

  const columns = [
    { header: "User ID", field: "userId" },
    { header: "User Name", field: "userName" },
    { header: "Issue Details", field: "issueDetails" },
    { header: "Date Issue", field: "dateIssue" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  return (
    <Box>
      <BreadCrumb linkText={[{ text: "Chat Support System" }]} />
      <PagePath2
        title="Chat "
        showSearch
        // searchTerm={search}
        // handleSearchTerm={onSearchChange}
      />
      <DataTable
        columns={columns}
        data={data}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ),
            title: "View",
            onClick: (row) => {
              navigate(`/chat-support-system/chatbox`);
            },
          },
        ]}
      />
      <Pagination
        currentPage={1}
        totalPages={2}
        totalItems={20}
        itemsPerPage={10}
        // onPageChange={onPageChange}
        // onItemsPerPageChange={onItemsPerPageChange}
      />
    </Box>
  );
};

export default ChatSupportSystem;
