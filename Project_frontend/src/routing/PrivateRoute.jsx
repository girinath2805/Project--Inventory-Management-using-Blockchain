import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        localStorage.getItem('authToken') ? (
          <Element />
        ) : (
          <Navigate to='/login' replace={true} />
        )
      }
    />
  );
};

export default PrivateRoute;
