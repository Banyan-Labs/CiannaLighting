import React, { FC } from "react";
import "./style/dashboard.scss";

import { AppProps } from "../../App";
import { Navigate } from "react-router-dom";
console.log('test')
const Dashboard: FC<AppProps> = ({ user, setUser }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          
          This is the dashboard.
          
        </>
      )}
    </>
  );
};

export default Dashboard;
