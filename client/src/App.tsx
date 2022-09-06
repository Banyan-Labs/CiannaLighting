import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Catalog from "./components/Catalog/Catalog";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Projects from "./components/Projects/Projects";
import CreateProjectPage from "./components/CreateProjectPage/CreateProjectPage";

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
        {Object.keys(user).length === 0 ? (
          ""
        ) : (
          <Navbar user={user} setUser={setUser} />
        )}
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
          <Route
            path="/projects/:user"
            element={<Projects user={user} setUser={setUser} />}
          />
          <Route
            path="/catalog/:user"
            element={<Catalog user={user} setUser={setUser} />}
          />
          <Route
            path="/create-project/:user"
            element={<CreateProjectPage user={user} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
