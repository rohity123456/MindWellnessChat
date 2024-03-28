import React, { useEffect, useState } from "react";
import { List, Input } from "antd";
import { ChatDoctor, getChatDoctors } from "./service";
import ChatCard from "./components/chatCard";
import styles from "./index.module.scss";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatDoctor[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatDoctor[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getChatDoctors().then((data) => {
      setChats(data);
      setFilteredChats(data);
    });
  }, []);

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
        placeholder="Search chats"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <List
        dataSource={filteredChats}
        renderItem={(chat) => <ChatCard chatUser={chat} />}
        className={styles["chatListUsers"]}
      />
    </div>
  );
};

export default ChatList;
