import { catchException } from "@/utils/helper";
import User from ".";
import { IUser } from "./types";

export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
  try {
    const userObj = await User.create(user);
    return userObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error("Error creating user");
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ username });
    return user?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getUser = async (filters: any): Promise<IUser | null> => {
  try {
    const user = await User.findOne(filters);
    return user?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const updateUser = async (
  userId: string,
  data: Partial<IUser>,
): Promise<IUser | null> => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
    return updatedUser?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getUsers = async (filters: any): Promise<IUser[]> => {
  try {
    const users = await User.find(filters);
    return users.map((user) => user.toObject());
  } catch (e: any) {
    catchException(e);
    return [];
  }
};
