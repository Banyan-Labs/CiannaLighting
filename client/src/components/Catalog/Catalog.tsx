import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import "./style/catalog.scss";

const Catalog: FC = () => {
  const { user } = useParams();
  return (
    <>
      <Navbar user={user} setUser={() => ""} />
      This is catalog page.
    </>
  );
};

export default Catalog;
