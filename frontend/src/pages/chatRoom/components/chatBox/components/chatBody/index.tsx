import { IMessage } from "@/types";
import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import { ActiveStatus } from "@/global/constants";
import ChatMessage from "./components/chatMessage";
import { useStateValue } from "@/store";

interface ChatBodyProps {
  messages: IMessage[];
}

const MESSAGES_FAKE: IMessage[] = [
  {
    _id: "60f3b3b3b3b3b3b3b3b3b3b3",
    content:
      "Lorem ipsum dolor sit amet consectetu consectetu consectetu consectetuaa consectetuaa consectetuaa",
    roomId: "60f3b3b3b3b3b3b3b3b3b3",
    sender: {
      _id: "60f3b3b3b3b3b3b3b3b3b",
      username: "user1",
      status: ActiveStatus.ACTIVE,
      createdAt: "2021-07-19T13:52:51.000Z",
      updatedAt: "2021-07-19T13:52:51.000Z",
      lastSeen: "2021-07-19T13:52:51.000Z",
    },
    recipient: {
      _id: "60f3b3b3b3b3b3b3b3b3c",
      username: "user2",
      status: ActiveStatus.ACTIVE,
      createdAt: "2021-07-19T13:52:51.000Z",
      updatedAt: "2021-07-19T13:52:51.000Z",
      lastSeen: "2021-07-19T13:52:51.000Z",
    },
    createdAt: "2021-07-19T13:52:51.000Z",
  },
  {
    _id: "60f3b3b3b3b3b3b3b3b3b4",
    content: "Lorem ipsum dolor sit amet consectetu",
    roomId: "60f3b3b3b3b3b3b3b3b3b3",
    recipient: {
      _id: "60f3b3b3b3b3b3b3b3b3b",
      username: "user1",
      status: ActiveStatus.ACTIVE,
      createdAt: "2021-07-19T13:52:51.000Z",
      updatedAt: "2021-07-19T13:52:51.000Z",
      lastSeen: "2021-07-19T13:52:51.000Z",
    },
    sender: {
      _id: "6605fa29004a585972a671f9",
      username: "user2",
      status: ActiveStatus.ACTIVE,
      createdAt: "2021-07-19T13:52:51.000Z",
      updatedAt: "2021-07-19T13:52:51.000Z",
      lastSeen: "2021-07-19T13:52:51.000Z",
    },
    createdAt: "2021-07-19T13:52:51.000Z",
  },
];

const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => {
  if (!messages.length) messages = MESSAGES_FAKE;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [{ user }] = useStateValue();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className={styles["chatBody"]} ref={scrollRef}>
      {messages.map((message) => (
        <ChatMessage
          message={message}
          isSender={message.sender._id === user?._id}
          key={message._id}
        />
      ))}
    </div>
  );
};

export default ChatBody;
