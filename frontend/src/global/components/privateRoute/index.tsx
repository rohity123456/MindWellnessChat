import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  component: JSX.Element;
};

export default function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  component,
}: PrivateRouteProps) {
  if (isAuthenticated) {
    return component;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
