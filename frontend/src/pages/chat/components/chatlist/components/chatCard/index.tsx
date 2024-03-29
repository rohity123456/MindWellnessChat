import React from "react";
import { IUser } from "@/types";
import { Button, Card } from "antd";
import styles from "./index.module.scss";
import { SendOutlined } from "@ant-design/icons";
import moment from "moment";

interface ChatCardProps {
  chatUser: IUser;
  handleStartChat: (chatUser: IUser) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ chatUser, handleStartChat }) => {
  if (!chatUser) return null;
  const isActive = chatUser.status === "active";
  const title = (
    <div className={styles["chatCardTitle"]}>
      <div className={`${isActive ? "greenDot" : "redDot"}`}></div>
      <p>{chatUser.username}</p>
    </div>
  );
  return (
    <Card title={title} className={styles["chatCard"]}>
      {isActive ? (
        <p>Active Now</p>
      ) : (
        <p>
          Last Seen:{" "}
          {chatUser.lastSeen ? moment().from(chatUser.lastSeen) : "NA"}
        </p>
      )}
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={() => handleStartChat(chatUser)}
      >
        Start Chat
      </Button>
    </Card>
  );
};

export default ChatCard;
