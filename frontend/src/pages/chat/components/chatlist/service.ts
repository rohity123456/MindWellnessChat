import apiService from "@/services";
import { IUser } from "@/types";

export interface ChatDoctor extends IUser {}

export const getChatDoctors = async () => {
  return apiService.get("/users/list").then((response) => {
    return response.data;
  });
};
