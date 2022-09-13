import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import YourProjects from "./YourProjects/YourProjects";
import "./style/dashboard.scss";

const Dashboard: FC = () => {
  const { user } = useAppSelector(({ auth: user }) => user);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login" + user.name);
  }, [user]);

  const [openModal, setOpenModal] = useState(false);
  const projectRoute = useCallback(() => {
    const to = `/projects/${user.name}`;
    navigate(to);
  }, [user.name, navigate]);

  return (
    <>
      {user.isAuth === true ? (
        <>
          <YourProjects />
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default Dashboard;
