import { Response } from "express";
export const sendJSONResponse = (
  res: Response,
  data: any,
  success: boolean = true,
  status = 200,
) => {
  const payload: any = {
    success: !!success,
  };

  if (success) {
    payload["data"] = data;
  } else {
    if (typeof data === "string") {
      payload["error"] = {
        details: data,
      };
    }
    if (typeof data === "object") {
      payload["error"] = data;
    }
  }
  return res.status(status).json(payload);
};

export const catchException = (e: any) => {
  console.log("Error Occured: ");
  console.log(e);
};
