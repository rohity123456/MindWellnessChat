import { createRoom, getRoom } from "@/models/room/service";
import { catchException, sendJSONResponse } from "@/utils/helper";
import { Request, Response } from "express";
import userController from "@/controllers/user";
import { getUser } from "@/models/user/service";
import { ObjectId } from "mongodb";
class RoomController {
  getOrCreateRoom = async (req: Request, res: Response) => {
    try {
      const users = req.body.users as string[];
      console.log("users : ", users);
      if (!users?.length)
        return sendJSONResponse(res, "users are required", false, 400);
      // check all users exist
      if (!userController.checkUsers(users))
        return sendJSONResponse(res, "users not found", false, 404);
      const filters = {
        users: users,
      };
      let room = await getRoom(filters);
      if (!room) {
        const roomParams = {
          users: users,
        };
        room = await createRoom(roomParams);
      }
      sendJSONResponse(res, room);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
  getRoom = async (req: Request, res: Response) => {
    try {
      const roomID = req.params.roomId;
      if (!roomID)
        return sendJSONResponse(res, "room id is required", false, 400);
      const filters = {
        _id: new ObjectId(roomID),
      };
      const rooms = await getRoom(filters);
      const users = rooms?.users || [];

      const usersObj = await Promise.all(
        users.map(async (user) => {
          const userObj = await getUser({ _id: new ObjectId(user) });
          return userObj;
        }),
      );
      sendJSONResponse(res, { ...rooms, users: usersObj });
    } catch (e: any) {
      catchException(e);
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new RoomController();
