import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Projects from "./components/Projects/Projects";

import "./index.scss";

export interface AppProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const App: FC<any> = (props) => {
  const [user, setUser] = useState<any>({});

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/catalog" element={<Navigate to="/login" />} />
          <Route path="/projects" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard/:user"
            element={<Dashboard user={user} setUser={setUser} />}
          />
          <Route path="/projects/:user" element={<Projects />} />
          <Route path="/catalog/:user" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
