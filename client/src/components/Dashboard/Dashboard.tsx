import React, { FC } from "react";
import "./style/dashboard.scss";

import DashboardNav from "./DashboardPageLower/DashboardNav";

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
          
          <DashboardNav />
          
        </>
      )}
    </>
  );
};

export default Dashboard;
