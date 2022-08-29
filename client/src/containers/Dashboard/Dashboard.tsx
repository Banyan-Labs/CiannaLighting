import React, { FC } from "react";
// import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./style/dashboard.scss";
// import axios from "../../api/axios";

import { AppProps } from "../../App";

const Dashboard: FC<AppProps> = ({user, setUser}) => {
  // const { user } = useParams();


  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      This is the dashboard.
      {/* <button onClick={(e)=>handleLogout(e)}>logout</button> */}
    </>
  );
};

export default Dashboard;
