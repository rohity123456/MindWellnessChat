import React, { useEffect, useState } from "react";
import { List, Input, message } from "antd";
import {
  ChatOnlineUser,
  getChatOnlineUsers,
  getOrCreateChatRoom,
} from "./service";
import ChatCard from "./components/chatCard";
import styles from "./index.module.scss";
import { useStateValue } from "@/store";
import { useNavigate } from "react-router-dom";
import SocketManager from "@/socket";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatOnlineUser[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatOnlineUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    const socketManager = SocketManager.getInstance();
    socketManager.getSocket().emit("connectUser", user?._id);
  }, []);

  useEffect(() => {
    getChatOnlineUsers()
      .then((data) => {
        setChats(data);
        setFilteredChats(data);
      })
      .catch((error) => {
        console.error("Error fetching chat onlineUsers", error);
        messageApi.error("Error fetching chat onlineUsers");
      });
  }, [messageApi]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = chats.filter((chat) =>
      chat.username.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredChats(filtered);
  };

  const handleStartChat = (chatUser: ChatOnlineUser) => {
    if (!user) return;
    getOrCreateChatRoom(user, chatUser)
      .then((data) => {
        navigate(`/chat/${data._id}`);
      })
      .catch((error) => {
        console.error("Error getting chat room", error);
        messageApi.error("Error getting chat room");
      });
  };

  return (
    <div className={styles["chatList"]}>
      <Input.Search
        placeholder="Search OnlineUsers"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List
        dataSource={filteredChats}
        renderItem={(chat) => (
          <ChatCard chatUser={chat} handleStartChat={handleStartChat} />
        )}
        className={styles["chatListUsers"]}
      />
      {contextHolder}
    </div>
  );
};

export default ChatList;
