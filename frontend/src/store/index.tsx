import { createContext, useContext, useReducer } from "react";
import { IInitialState } from "./reducer";
const StateContext = createContext({} as any);

const StateProvider: React.FC<{
  reducer: any;
  initialState: IInitialState;
  children: React.ReactNode;
}> = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): [IInitialState, any] =>
  useContext(StateContext);
export default StateProvider;
