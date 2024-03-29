import { MessageStatus } from "@/utils/constants";
import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    status: { type: String, enum: MessageStatus, default: MessageStatus.SENT },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Message = model("Message", messageSchema);

export default Message;
