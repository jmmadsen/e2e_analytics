import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context/Auth";


// not currently using this Component to protect routes, using Axios interceptors to redirect to login instead
const PrivateRoute = ({ component: Component, ...rest }) => {

  const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
  
}

export default PrivateRoute;