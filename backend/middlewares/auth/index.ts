import { getUserByUsername } from "@/models/user/service";
import { catchException, sendJSONResponse } from "@/utils/helper";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user?: any;
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const username = req.headers["username"] as string;
    if (!username) return sendJSONResponse(res, "Unauthorized", false, 401);
    const user = await getUserByUsername(username);
    if (!user) return sendJSONResponse(res, "Unauthorized", false, 401);
    req.user = user;
    next();
  } catch (e) {
    catchException(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
