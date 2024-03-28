import React from "react";
import { IUser } from "@/types";
import { Button, Card } from "antd";
import styles from "./index.module.scss";
import { SendOutlined } from "@ant-design/icons";

interface ChatCardProps {
  chatUser: IUser;
}

const ChatCard: React.FC<ChatCardProps> = ({ chatUser }) => {
  if (!chatUser) return null;
  const handleStartChat = () => {};
  const isActive = chatUser.status === "active";
  const title = (
    <div className={styles["chatCardTitle"]}>
      <div className={`${isActive ? "greenDot" : "redDot"}`}></div>
      <p>{chatUser.username}</p>
    </div>
  );
  return (
    <Card title={title} className={styles["chatCard"]}>
      <p>Last Seen: {chatUser.lastSeen?.toString() || "NA"}</p>
      <Button type="primary" icon={<SendOutlined />} onClick={handleStartChat}>
        Start Chat
      </Button>
    </Card>
  );
};

export default ChatCard;
