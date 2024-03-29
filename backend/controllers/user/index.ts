import {
  createUser,
  getUserByUsername,
  getUsers,
  getUser,
} from "@/models/user/service";
import { sendJSONResponse } from "@/utils/helper";
import { Request, Response } from "express";
import Joi from "joi";
import { ObjectId } from "mongodb";
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

  getUsers = async (req: Request, res: Response) => {
    try {
      const filters = {
        ...req.query,
      };
      const users = await getUsers(filters);
      sendJSONResponse(res, users);
    } catch (e: any) {
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

  checkUsers = async (users: string[]) => {
    return users.every(
      async (user) => await getUser({ _id: new ObjectId(user) }),
    );
  };
}

export default new UserController();
