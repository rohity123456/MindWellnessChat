import { ActiveStatus, UserRole } from "@/utils/constants";

export interface IUser {
  username: string;
  role: UserRole;
  status: ActiveStatus;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}
