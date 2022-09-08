import React, { FC } from "react";
import "./style/dashboard.scss";
import data from "../../data/data.json"
import { AppProps } from "../../App";
import { Navigate } from "react-router-dom";
console.log('test')
const Dashboard: FC<AppProps> = ({ user, setUser }) => {
  console.log(data, "dataType")
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
