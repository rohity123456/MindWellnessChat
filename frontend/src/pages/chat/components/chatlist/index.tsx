import React, { useEffect, useState } from "react";
import { List, Input, message } from "antd";
import { ChatDoctor, getChatDoctors } from "./service";
import ChatCard from "./components/chatCard";
import styles from "./index.module.scss";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatDoctor[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatDoctor[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getChatDoctors()
      .then((data) => {
        setChats(data);
        setFilteredChats(data);
      })
      .catch((error) => {
        console.error("Error fetching chat doctors", error);
        messageApi.error("Error fetching chat doctors");
      });
  }, [messageApi]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = chats.filter((chat) =>
      chat.username.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredChats(filtered);
  };

  return (
    <div className={styles["chatList"]}>
      <Input.Search
        placeholder="Search Doctors"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List
        dataSource={filteredChats}
        renderItem={(chat) => <ChatCard chatUser={chat} />}
        className={styles["chatListUsers"]}
      />
      {contextHolder}
    </div>
  );
};

export default ChatList;
