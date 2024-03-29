import { useParams } from "react-router-dom";
import ChatBox from "./components/chatBox";
import { useEffect, useState } from "react";
import { IRoom } from "@/types";
import { getChatRoom } from "../chat/components/chatlist/service";
import { useStateValue } from "@/store";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState<IRoom | null>(null);
  const [{ user }] = useStateValue();
  useEffect(() => {
    getChatRoom(roomId as string).then((data) => {
      setRoom(data);
    });
  }, [roomId]);

  if (!room) return null;

  const recipient = room?.users.find((userObj) => userObj._id !== user?._id);

  return (
    <>
      <ChatBox roomId={roomId as string} recipient={recipient} />
    </>
  );
};
export default ChatRoomPage;
