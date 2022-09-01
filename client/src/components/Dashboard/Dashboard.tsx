import React, { FC } from "react";
import Navbar from "../Navbar/Navbar";
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
          <Navbar user={user} setUser={setUser} />
          This is the dashboard.
        </>
      )}
    </>
  );
};

export default Dashboard;
