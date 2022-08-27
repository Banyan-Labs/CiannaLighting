import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./containers/Catalog/Catalog";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Projects from "./containers/Projects/Projects";
import "./index.scss";


export interface AppProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const App: FC<AppProps> = (props) => {
  const [user, setUser] = useState({})

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/catalog" element={<Navigate to="/login" />} />
          <Route path="/projects" element={<Navigate to="/login" />} />
          <Route path="/dashboard/:user" element={<Dashboard user={user} setUser={setUser}/>} />
          <Route path="/projects/:user" element={<Projects />} />
          <Route path="/catalog/:user" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
