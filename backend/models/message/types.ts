import { MessageStatus } from "@/utils/constants";

export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  status: MessageStatus;
  content: string;
}
