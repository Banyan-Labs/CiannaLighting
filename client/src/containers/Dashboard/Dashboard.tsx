import React, { FC } from "react";
// import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./style/dashboard.scss";

import { AppProps } from "../../App";

const Dashboard: FC<AppProps> = ({user, setUser}) => {
  // const { user } = useParams();

  return (
    <>
      <Navbar user={user} />
      This is the dashboard.
    </>
  );
};

export default Dashboard;
