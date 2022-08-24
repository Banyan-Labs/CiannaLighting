import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./containers/Catalog/Catalog";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Projects from "./containers/Projects/Projects";
import "./index.scss";

export interface AppProps {}

const App: FC<AppProps> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/catalog" element={<Navigate to="/login" />} />
          <Route path="/projects" element={<Navigate to="/login" />} />
          <Route path="/dashboard/:user" element={<Dashboard />} />
          <Route path="/projects/:user" element={<Projects />} />
          <Route path="/catalog/:user" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
