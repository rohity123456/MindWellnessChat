import { createUser, getUserByUsername } from "@/models/user/service";
import { sendJSONResponse } from "@/utils/helper";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
class UserController {
  signInSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
  });
  signin = async (req: Request, res: Response) => {
    try {
      const { error, value } = this.signInSchema.validate(req.body);
      if (error) {
        sendJSONResponse(res, error.message, false, 400);
      }
      const username = value.username;
      let user = await getUserByUsername(username);
      if (!user) {
        // create user for now if not found
        console.log("creating user");
        user = await createUser({ username });
      }
      sendJSONResponse(res, user);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new UserController();
