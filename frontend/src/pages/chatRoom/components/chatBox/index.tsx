import { IMessage, IUser } from "@/types";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  createMessage,
  getChatMessages,
} from "@/pages/chat/components/chatlist/service";
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
  const [page] = useState<number>(1);
  const [incomingMessage, setIncomingMessage] = useState<IMessage | null>(null);
  const socketRef = useRef<SocketManager | null>(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    socketRef.current = SocketManager.getInstance();
    const socket = socketRef.current.getSocket();
    socket.emit("joinRoom", { userId: user?._id, roomId });
  }, [roomId, user]);
  useEffect(() => {
    getChatMessages(roomId, page).then((data) => {
      const messages = data.messages;
      messages.reverse();
      setMessages(data.messages);
    });
    socketRef.current = SocketManager.getInstance();
  }, [roomId, page]);

  useEffect(() => {
    socketRef.current?.getSocket().on("getMessage", ({ message }) => {
      console.log("Got message", message);
      if (!message) return;
      const messageObj: IMessage = {
        ...message,
        sender: recipient,
        recipient: user,
      };
      setIncomingMessage({
        ...messageObj,
      });
    });
  }, [socketRef, recipient, user]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleSendMessage = (message: string) => {
    createMessage({
      content: message,
      sender: user?._id,
      recipient: recipient?._id,
      roomId: roomId,
    }).then((data) => {
      const socket = socketRef.current?.getSocket();
      socket?.emit("sendMessage", { message: data });
      setMessages((prev) => [...prev, { ...data }]);
    });
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
