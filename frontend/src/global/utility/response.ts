import { message } from "antd";

export type TError = {
  details: number;
  msg: string;
};

export type TResponse = {
  error?: TError;
  data?: any;
  payload?: any;
};

export const handleError = (resp: TResponse) => {
  if (resp.error) {
    const errorMsg: string =
      resp?.error?.msg || "Something went wrong. Please try again later.";
    message.error(errorMsg);
  }
  return resp;
};

export const getData = (resp: any) => {
  if (resp.error) {
    return handleError(resp);
  }
  return resp?.payload?.data;
};

export const getPayload = (resp: any) => {
  if (resp.error) {
    return handleError(resp);
  }
  return resp?.payload;
};

export const getResponse = (resp: any) => {
  if (resp.error) {
    return handleError(resp);
  }
  return resp;
};
