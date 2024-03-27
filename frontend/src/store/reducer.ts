import { IDoctor, IUser } from "@/types/index";

export interface IInitialState {
  user: IUser | null;
  doctors: IDoctor[] | [];
}

export const initialState: IInitialState = {
  user: null,
  doctors: [],
};
export const actionTypes = {
  SET_DOCTOR_LIST: "SET_DOCTOR_LIST",
  SET_USER: "SET_USER",
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
      default:
        return state;
    }
  }
};
export default reducer;