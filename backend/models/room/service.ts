import { catchException } from "@/utils/helper";
import Room from ".";
import { IRoom } from "./types";

export const createRoom = async (room: Partial<IRoom>): Promise<IRoom> => {
  try {
    const roomObj = await Room.create(room);
    return roomObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error("Error creating room");
  }
};

export const updateRoom = async (
  roomId: string,
  room: IRoom,
): Promise<IRoom | null> => {
  try {
    const updatedRoom = await Room.findOneAndUpdate({ roomId }, room, {
      new: true,
    });
    return updatedRoom?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getRoom = async (filters: any): Promise<IRoom | null> => {
  try {
    const room = await Room.findOne(filters);
    return room?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getRooms = async (filters: any): Promise<IRoom[]> => {
  try {
    const rooms = await Room.find(filters);
    return rooms.map((room) => room.toObject());
  } catch (e: any) {
    catchException(e);
    return [];
  }
};
