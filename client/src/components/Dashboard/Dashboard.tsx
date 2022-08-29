import React, { FC } from "react";
import Navbar from "../Navbar/Navbar";
import "./style/dashboard.scss";

import { AppProps } from "../../App";

const Dashboard: FC<AppProps> = ({ user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      This is the dashboard.
    </>
  );
};

export default Dashboard;
