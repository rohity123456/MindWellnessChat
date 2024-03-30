import { CustomRequest } from "@/middlewares/auth";
import {
  createUser,
  getUserByUsername,
  getUsers,
  getUser,
} from "@/models/user/service";
import { catchException, sendJSONResponse } from "@/utils/helper";
import { Request, Response } from "express";
import Joi from "joi";
import roomController from "@/controllers/room";
import SocketManager from "socket";
class UserController {
  signInSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
  });
  signin = async (req: Request, res: Response) => {
    try {
      const { error, value } = this.signInSchema.validate(req.body);
      if (error) {
        return sendJSONResponse(res, error.message, false, 400);
      }
      const username = value.username;
      let user = await getUserByUsername(username);
      if (!user) {
        // create user for now if not found
        console.log("creating user");
        user = await createUser({ username });
      }
      return sendJSONResponse(res, user);
    } catch (e: any) {
      return sendJSONResponse(res, e, false, 500);
    }
  };

  getUsers = async (req: CustomRequest, res: Response) => {
    try {
      const user = req.user;
      const onlineUsers =
        SocketManager.getInstance().getOnlineUsers() || new Map();
      let onLineUsersList = Array.from(onlineUsers).map(([key, _]) =>
        key.toString(),
      );
      if (!onLineUsersList.length) return sendJSONResponse(res, []);
      onLineUsersList = onLineUsersList.filter(
        (id) => id?.toString() !== user?._id?.toString(),
      );

      const filters = {
        ...req.query,
        _id: { $in: onLineUsersList },
      };
      const users = await getUsers(filters);
      sendJSONResponse(res, users);
    } catch (e: any) {
      catchException(e);
      sendJSONResponse(res, e, false, 500);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const filters = {
        _id: req.params.userId,
      };
      const user = await getUser(filters);
      sendJSONResponse(res, user);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  getUserChats = async (req: CustomRequest, res: Response) => {
    try {
      const usersIds = await roomController.getUserIdsFromRooms(req.user?._id);
      if (!usersIds?.length) return sendJSONResponse(res, []);
      const filters = {
        _id: { $in: usersIds },
      };
      const users = await getUsers(filters);
      sendJSONResponse(res, users);
    } catch (e: any) {
      catchException(e);
      sendJSONResponse(res, e, false, 500);
    }
  };

  checkUsers = async (users: string[]) => {
    const userList = await getUsers({ _id: { $in: users } });
    if (userList.length === users.length) return true;
    return false;
  };
}

export default new UserController();
