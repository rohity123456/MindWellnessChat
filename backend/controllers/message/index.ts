import { CustomRequest } from "@/middlewares/auth";
import { createMessage, getMessages } from "@/models/message/service";
import { sendJSONResponse } from "@/utils/helper";
import { Request, Response } from "express";
class MessageController {
  getMessages = async (req: Request, res: Response) => {
    try {
      const filters = {
        roomId: req.params.roomId,
      };
      const pageNo = parseInt((req.query.pageNo || "1") as string);
      const pageSize = parseInt((req.query.pageSize || "10") as string);

      const [messages, totalMessages] = await getMessages(
        filters,
        pageNo,
        pageSize,
      );
      sendJSONResponse(res, {
        messages,
        totalMessages,
        pageNo,
        pageSize,
      });
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
  createMessage = async (req: CustomRequest, res: Response) => {
    try {
      const message = req.body;
      const messageObj = {
        content: message.content,
        roomId: message.roomId,
        sender: message.sender,
        recipient: message.recipient,
      };
      const createdMessage = await createMessage(messageObj);
      sendJSONResponse(res, createdMessage);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new MessageController();
