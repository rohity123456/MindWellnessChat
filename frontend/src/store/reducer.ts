import { IUser } from "@/types/index";

export interface IInitialState {
  user: IUser | null;
  onlineUsers: IUser[] | [];
  isAuthenticated: boolean;
}

const user = localStorage.getItem("user");

export const initialState: IInitialState = {
  user: user ? JSON.parse(user) : null,
  onlineUsers: [],
  isAuthenticated: !!user,
};
export const actionTypes = {
  SET_ONLINEUSER_LIST: "SET_ONLINEUSER_LIST",
  SET_USER: "SET_USER",
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
};

export interface IAction {
  type: keyof typeof actionTypes;
  payload?: any;
}

const reducer = (state: IInitialState, action: IAction) => {
  if (action) {
    switch (action.type) {
      case actionTypes.SET_ONLINEUSER_LIST:
        return { ...state, onlineUsers: action.payload };
      case actionTypes.SET_USER:
        return { ...state, user: action.payload };
      case actionTypes.SET_AUTHENTICATED:
        return { ...state, isAuthenticated: action.payload };
      default:
        return state;
    }
  }
};
export default reducer;
