import { IMessage } from "@/types";
import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import ChatMessage from "./components/chatMessage";
import { useStateValue } from "@/store";

interface ChatBodyProps {
  messages: IMessage[];
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [{ user }] = useStateValue();
  useEffect(() => {
    setTimeout(() => {
      scrollRef?.current?.scrollBy({
        top: scrollRef?.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [messages]);
  return (
    <div className={styles["chatBody"]} ref={scrollRef}>
      {messages.map((message) => (
        <ChatMessage
          message={message}
          isSender={message.sender === user?._id}
          key={message._id}
        />
      ))}
    </div>
  );
};

export default ChatBody;
