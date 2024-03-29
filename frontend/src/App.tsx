import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import styles from "./App.module.scss";
import PrivateRoute from "@/global/components/privateRoute";
import NonAuthRoute from "@/global/components/nonAuthRoute";
import ErrorPage from "@/pages/error";
import ChatPage from "@/pages/chat";
import ChatRoomPage from "@/pages/chatRoom";
import LoginPage from "@/pages/login";
import { useStateValue } from "@/store";

function App() {
  const [{ isAuthenticated }] = useStateValue();
  const defaultPrivateRouteProps = {
    isAuthenticated,
    authenticationPath: "/login",
  };
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/chat" />} />
          <Route path="/chat">
            <Route
              index
              element={
                <PrivateRoute
                  {...defaultPrivateRouteProps}
                  component={<ChatPage />}
                />
              }
            />
            <Route
              path=":roomId"
              element={
                <PrivateRoute
                  {...defaultPrivateRouteProps}
                  component={<ChatRoomPage />}
                />
              }
            ></Route>
          </Route>
          <Route
            path="/login"
            element={
              <NonAuthRoute
                isAuthenticated={isAuthenticated}
                redirectPath="/"
                component={<LoginPage />}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
