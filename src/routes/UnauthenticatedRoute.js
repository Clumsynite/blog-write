import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          <Component {...props} {...appProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
