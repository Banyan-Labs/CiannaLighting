import React, { FC, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Navbar from "./components/Navbar/Navbar";
import Catalog from "./components/Catalog/Catalog";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Projects from "./components/SingleProject/Projects";
import CreateProjectPage from "./components/CreateProjectPage/CreateProjectPage";
import "./index.scss";

export interface AppProps {
  user: any;
}

const App: FC = () => {
  const { user } = useAppSelector(({ auth: user }) => user);

  return (
    <>
      <BrowserRouter>
        {user.isAuth && <Navbar user={user} />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/catalog" element={<Navigate to="/login" />} />
          {/* <Route path="/projects/all" element={< />}/> */}
          <Route path="/dashboard/:user" element={<Dashboard />} />
          <Route path="/projects/:user" element={<Projects user={user} />} />
          <Route path="/catalog/:user" element={<Catalog user={user} />} />
          <Route
            path="/create-project/:user"
            element={<CreateProjectPage user={user} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
