import react, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";

import "./style/style.scss";

const AllUserProjects: FC<AppProps> = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="all-user-projects-container">
            <p>
              {/* This is for all users projects. Need to pull data and display all user
              projects in grid. */}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default AllUserProjects;