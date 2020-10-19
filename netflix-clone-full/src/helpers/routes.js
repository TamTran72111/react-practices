import React from "react";
import { Redirect, Route } from "react-router-dom";
import { SIGN_IN } from "../constants/routes";

export const IsUserRedirect = ({
  user,
  loggedInPath,
  children,
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={() => {
        if (!user) {
          return children;
        } else {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }
      }}
    />
  );
};

export const ProtectedRoute = ({ user, children, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: SIGN_IN,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};
