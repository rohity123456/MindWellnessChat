import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reducer, { initialState } from "@/store/reducer";
import StateProvider from "./store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
);
