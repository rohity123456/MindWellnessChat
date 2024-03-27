import { Navigate } from "react-router-dom";

export type NonAuthRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
  component: JSX.Element;
};

export default function NonAuthRoute({
  isAuthenticated,
  redirectPath,
  component,
}: NonAuthRouteProps) {
  if (!isAuthenticated) {
    return component;
  } else {
    return <Navigate to={{ pathname: redirectPath }} />;
  }
}
