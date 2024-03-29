import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROLES } from './app/constants';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Projects from './components/SingleProject/Projects';
import CreateProjectPage from './components/CreateProjectPage/CreateProjectPage';
import PersistLogin from './components/PersistLogin/PersistLogin';
import Unauthorized from './components/RequireAuth/Unauthorized';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Inventory from './components/Inventory/Inventory';
import Details from './components/Rooms/Details';

import './index.scss';

export interface AppProps {
    user: any;
}

const App: FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<PersistLogin />}>
                            {/* Admin Routes! */}
                            <Route
                                element={
                                    <RequireAuth
                                        roles={[ROLES.Admin, ROLES.Employee]}
                                    />
                                } // this is how to restrict access on the frontend. The role you pass in is the allowed role
                            >
                                <Route
                                    path="/cmd/inventory"
                                    element={<Inventory />}
                                />
                                <Route
                                    path="/cmd/dash/*"
                                    element={<AdminDashboard />}
                                />
                            </Route>
                            <Route
                                element={
                                    <RequireAuth roles={Object.values(ROLES)} />
                                }
                            >
                                <Route
                                    path={'/dashboard'}
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/projects/:user"
                                    element={<Projects />}
                                />
                                <Route
                                    path="/project/:user"
                                    element={<Projects />}
                                />
                                <Route
                                    path="/catalog"
                                    element={<Details projectView={false} />}
                                />

                                <Route
                                    path="/create-project/:user"
                                    element={<CreateProjectPage />}
                                />
                                <Route
                                    path="/createLight/:user"
                                    element={<Details projectView={true} />}
                                />
                                <Route
                                    path="/unauthorized"
                                    element={<Unauthorized />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
