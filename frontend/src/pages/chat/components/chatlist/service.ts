import apiService from "@/services";
import { IUser } from "@/types";

export interface ChatOnlineUser extends IUser {}

export const getChatOnlineUsers = async () => {
  return apiService.get("/users/list").then((response) => {
    return response.data;
  });
};

export const getMyChats = async () => {
  return apiService.get("/users/mychats").then((response) => {
    return response.data;
  });
};

export const getOrCreateChatRoom = async (user: IUser, chatUser: IUser) => {
  const userId = user._id;
  const chatUserId = chatUser._id;
  return apiService
    .post("/rooms", {
      users: [userId, chatUserId],
    })
    .then((response) => {
      return response.data;
    });
};

export const getChatRoom = async (roomId: string) => {
  return apiService.get(`/rooms/${roomId}`).then((response) => {
    return response.data;
  });
};

export const getChatMessages = async (
  roomId: string,
  page = 1,
  pageSize = 100,
) => {
  return apiService
    .get(`/messages/${roomId}?page=${page}&pageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    });
};

export const createMessage = async (message: object) => {
  return apiService.post(`/messages`, message).then((response) => {
    return response.data;
  });
};
