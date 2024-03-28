import { getConstant } from "@/global/constants";
import { IUser } from "@/types";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiService: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: getConstant("apiTimeout"),
});

apiService.interceptors.request.use(
  (config: any) => {
    const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.username) {
      config.headers.username = user.username;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseData = response.data;
    return responseData;
  },
  (error) => {
    const errorMessage =
      error.response.data?.error?.message ||
      error.response.data?.error?.details;
    return Promise.reject(errorMessage);
  },
);

export default apiService;
