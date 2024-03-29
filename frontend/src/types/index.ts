import { ActiveStatus } from "@/global/constants";
export interface IUser {
  _id: string;
  username: string;
  status: ActiveStatus;
  lastSeen: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IRoom {
  _id: string;
  users: IUser[];
}

export interface IMessage {
  _id: string;
  content: string;
  roomId: string;
  sender: string;
  recipient: string;
  createdAt: string;
  updatedAt?: string;
}
