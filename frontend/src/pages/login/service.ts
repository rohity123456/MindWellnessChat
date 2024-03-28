import apiService from "@/services";

export interface LoginParamsType {
  username: string;
}

export const loginUser = async (params: LoginParamsType) => {
  return apiService.post("/auth/signin", params).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  });
};
