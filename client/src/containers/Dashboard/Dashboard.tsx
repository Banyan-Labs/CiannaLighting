import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./style/dashboard.scss";

const Dashboard: FC = ({}) => {
  const { user } = useParams();

  return (
    <>
      <Navbar user={user} />
      This is the dashboard.
    </>
  );
};

export default Dashboard;
