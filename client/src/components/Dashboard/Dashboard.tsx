import React, { FC } from "react";
import "./style/dashboard.scss";

import { AppProps } from "../../App";
import { Navigate } from "react-router-dom";
console.log("test");
const Dashboard: FC<AppProps> = ({ user, setUser }) => {
  const testProjectData = [
    {
      name: "Salt Lake Temple",
      color: "#AC92EB",
      status: "new",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam …",
      date_created: "08-02-2022",
      activity: [],
      rooms: [
        { name: "", description: "", lights: [] },
        { name: "", description: "", lights: [] },
      ],
      attachments: [],
      rfp: {
        header: "",
        schedule: "",
        scope: "",
        bid: "",
        submittals: "",
        quality_standards: "",
        contact_info: "",
      },
    },
  ];
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="dashboard-upper-section"></div>
        </>
      )}
    </>
  );
};

export default Dashboard;
