import { ActiveStatus } from "@/global/constants";
import styles from "./index.module.scss";
import { IUser } from "@/types";

interface ChatHeaderProps {
  recipient?: IUser | null;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ recipient }) => {
  if (!recipient) return null;
  const isActive = recipient.status === ActiveStatus.ACTIVE;
  return (
    <div className={styles["chatHeader"]}>
      <div className={styles["avatar"]}>
        <div className={`${isActive ? "greenDot" : "redDot"}`}></div>
        <p>{recipient?.username}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
