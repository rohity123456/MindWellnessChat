import { MessageStatus } from "@/utils/constants";

export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  roomId: string;
  status: MessageStatus;
  content: string;
}
