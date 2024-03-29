import { useParams } from "react-router-dom";
import ChatBox from "./components/chatBox";
import { useEffect, useState } from "react";
import { IRoom } from "@/types";
import { getChatRoom } from "../chat/components/chatlist/service";
import { useStateValue } from "@/store";
import { message } from "antd";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState<IRoom | null>(null);
  const [{ user }] = useStateValue();
  const [displayMessageObj, setDisplayMessageObj] = useState({
    type: "",
    content: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (displayMessageObj.content) {
      messageApi.open({
        type: displayMessageObj.type as any,
        content: displayMessageObj.content,
      });
      setDisplayMessageObj({
        type: "",
        content: "",
      });
    }
  }, [displayMessageObj, messageApi]);

  useEffect(() => {
    getChatRoom(roomId as string)
      .then((data) => {
        setRoom(data);
      })
      .catch((error) => {
        console.error("Error fetching chat room", error);
        setDisplayMessageObj({
          type: "error",
          content: "Error fetching chat room",
        });
      });
  }, [roomId]);

  if (!room) return null;

  const recipient = room?.users.find((userObj) => userObj._id !== user?._id);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <ChatBox roomId={roomId as string} recipient={recipient} />
    </div>
  );
};
export default ChatRoomPage;
