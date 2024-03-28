import { IDoctor, IUser } from "@/types/index";

export interface IInitialState {
  user: IUser | null;
  doctors: IDoctor[] | [];
  isAuthenticated: boolean;
}

export const initialState: IInitialState = {
  user: null,
  doctors: [],
  isAuthenticated: false,
};
export const actionTypes = {
  SET_DOCTOR_LIST: "SET_DOCTOR_LIST",
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
      case actionTypes.SET_DOCTOR_LIST:
        return { ...state, doctors: action.payload };
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
