import { IMessage } from "@/types";
import styles from "./index.module.scss";
import moment from "moment";

interface ChatMessageProps {
  message: IMessage;
  isSender: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSender }) => {
  if (!message) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
      }}
    >
      <div
        className={
          isSender
            ? `${styles["sender"]} ${styles["chatMessage"]}`
            : `${styles["reciever"]} ${styles["chatMessage"]}`
        }
      >
        <div className={styles["content"]}>
          <p>{message.content}</p>
          <span>{moment(message.createdAt).format("LT")}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
