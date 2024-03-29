import { IMessage, IUser } from "@/types";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { getChatMessages } from "@/pages/chat/components/chatlist/service";
import ChatHeader from "./components/chatHeader";
import ChatInput from "./components/chatInput";
import ChatBody from "./components/chatBody";
import SocketManager from "@/socket";
import { useStateValue } from "@/store";
interface ChatBoxProps {
  roomId: string;
  recipient?: IUser | null;
}

const ChatBox = ({ roomId, recipient }: ChatBoxProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [incomingMessage, setIncomingMessage] = useState<IMessage | null>(null);
  const socketRef = useRef<SocketManager | null>(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    socketRef.current = SocketManager.getInstance();
    const socket = socketRef.current.getSocket();
    socket.emit("joinRoom", user?._id);
  }, []);
  useEffect(() => {
    getChatMessages(roomId, page).then((data) => {
      setMessages(data.messages);
    });
    socketRef.current = SocketManager.getInstance();
  }, [roomId]);

  useEffect(() => {
    socketRef.current?.getSocket().on("getMessage", (message) => {
      setIncomingMessage({
        ...message,
      });
    });
  }, [socketRef]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div className={styles["chatBox"]}>
      <ChatHeader recipient={recipient} />
      <ChatBody messages={messages} />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
export default ChatBox;
