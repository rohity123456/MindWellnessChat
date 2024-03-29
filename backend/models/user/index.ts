import { ActiveStatus } from "@/utils/constants";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ActiveStatus,
      default: ActiveStatus.INACTIVE,
    },
    lastSeen: Date,
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
