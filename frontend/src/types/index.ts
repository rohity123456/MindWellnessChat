import { UserRole, ActiveStatus } from "@/global/constants";
export interface IUser {
  username: string;
  role: UserRole;
  status: ActiveStatus;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDoctor extends IUser {
  role: UserRole.DOCTOR;
}
