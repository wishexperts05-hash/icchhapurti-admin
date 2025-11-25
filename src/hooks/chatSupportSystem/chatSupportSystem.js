import { useState } from "react";
import { useRecoilState } from "recoil";
import { chatSupportSystemListAtom } from "../../state/chatSupportSystem/chatSupportSystemState";
import useFetch from "../useFetch"; 
import { toast } from "react-toastify";
import conf from "../../config/index";
import Swal from "sweetalert2";
import { confirmAlert } from "../../utils/alertToast";
import { useNavigate } from "react-router-dom";

const useChatSupportSystem = () => {
   const [chatSupportList, setChatSupportList] = useRecoilState(chatSupportSystemListAtom);
  const [loading, setLoading] = useState(false);
    const [fetchData] = useFetch(); 


const fetchAllChatConversations = async () => {
  setLoading(true);
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/chat/getAllConversations`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    console.log("API response", res);

    // Extract the array safely
    const list =
      Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

    setChatSupportList(list);

    return list;
  } catch (error) {
    console.error("Error fetching chat conversations:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch conversations");
  } finally {
    setLoading(false);
  }
};


const fetchConversationById = async (conversationId) => {
  setLoading(true);
  try {
    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}admin/chat/getConversationById/${conversationId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!res?.data) return [];

    const mappedMessages = res.data.messages.map((msg, idx) => ({
      id: idx + 1,
      type: msg.userType === "User" ? "incoming" : "outgoing",
      msg: msg.message,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: msg.Username,
      image: msg.profileImage,
    }));

    return {
      conversation: res.data.conversation,
      messages: mappedMessages,
    };
  } finally {
    setLoading(false);
  }
};


const sendMessage = async ({ receiverId, receiverType, message }) => {
  setLoading(true);
  try {
    const res = await fetchData({
      method: "POST",
      url: `${conf.apiBaseUrl}admin/chat/sendMessage`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      data: {
        receiverId,
        receiverType,
        message,
      },
    });

    toast.success("Message sent successfully!");
    return res.data;
  } catch (error) {
    console.error("Send message error:", error);
    toast.error(error?.response?.data?.message || "Failed to send message");
    return null;
  } finally {
    setLoading(false);
  }
};





  return {
    loading,
   fetchAllChatConversations,
   chatSupportList,
   fetchConversationById,
   sendMessage,
  };
};

export default useChatSupportSystem;

