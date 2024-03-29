import { catchException } from "@/utils/helper";
import Message from ".";
import { IMessage } from "./types";

export const createMessage = async (
  message: Partial<IMessage>,
): Promise<IMessage> => {
  try {
    const messageObj = await Message.create(message);
    return messageObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error("Error creating message");
  }
};

export const updateMessage = async (
  messageId: string,
  message: IMessage,
): Promise<IMessage | null> => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { messageId },
      message,
      {
        new: true,
      },
    );
    return updatedMessage?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getMessages = async (
  filters: any,
  pageNo: number,
  pageSize: number,
): Promise<[IMessage[], number]> => {
  try {
    const messages = await Message.find(filters)
      .skip((pageNo - 1) * pageSize)
      .sort({ createdAt: -1 })
      .limit(pageSize);
    const total = await Message.countDocuments(filters);
    return [messages.map((message) => message.toObject()), total];
  } catch (e: any) {
    catchException(e);
    return [[], 0];
  }
};
