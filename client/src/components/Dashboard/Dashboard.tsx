import React, { FC } from "react";
import Navbar from "../Navbar/Navbar";
import "./style/dashboard.scss";

import { AppProps } from "../../App";
import { Navigate } from "react-router-dom";

const Dashboard: FC<AppProps> = ({ user, setUser }) => {
  {
    if (Object.keys(user).length === 0) {
      return <Navigate to="/login" />;
    } else {
      return (
        <>
          <Navbar user={user} setUser={setUser} />
          This is the dashboard.
        </>
      );
    }
  }
};

export default Dashboard;
