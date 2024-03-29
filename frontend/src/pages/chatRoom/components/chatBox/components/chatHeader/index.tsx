import { Avatar } from "antd";
import styles from "./index.module.scss";
import { IUser } from "@/types";

interface ChatHeaderProps {
  recipient?: IUser | null;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ recipient }) => {
  if (!recipient) return null;
  return (
    <div className={styles["chatHeader"]}>
      <div className={styles["avatar"]}>
        <Avatar />
        <p>{recipient?.username}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
