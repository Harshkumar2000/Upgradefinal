import React from "react";
import { Navigate, Route } from "react-router";

const ProtectedRoute = ({ component: Component, path, adminOnly }) => {
  const isLoggedIn = true;
  const isAdmin = true; 

  return (
    <Route
      path={path}
      render={(props) => {
        if ((!adminOnly && isLoggedIn) || (adminOnly && isAdmin)) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
