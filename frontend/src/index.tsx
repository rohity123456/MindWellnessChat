import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme as AntTheme } from "antd";
import theme from "@/global/styles/theme";
import "./index.scss";
import App from "./App";
import reducer, { initialState } from "@/store/reducer";
import StateProvider from "./store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const { darkAlgorithm } = AntTheme;
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ ...theme, algorithm: darkAlgorithm }}>
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
