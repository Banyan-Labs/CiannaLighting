import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROLES } from './app/constants';
import './index.scss';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Layout from './components/Layout/Layout';
import Catalog from './components/Catalog/Catalog';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Projects from './components/SingleProject/Projects';
import CreateProjectPage from './components/CreateProjectPage/CreateProjectPage';
import AllUserProjects from './components/AllUserProjects/AllUserProjects';
import PersistLogin from './components/PersistLogin/PersistLogin';
import Unauthorized from './components/RequireAuth/Unauthorized';
import RoomDetails from './components/Rooms/RoomDetails';

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
                            <Route
                                element={
                                    <RequireAuth roles={Object.values(ROLES)} />
                                }
                            >
                                {/* <Route
                            path="/catalog"
                            element={<Navigate to="/login" />}
                        /> */}
                                <Route
                                    path="/projects/all/:user"
                                    element={<AllUserProjects />}
                                />

                                <Route
                                    path={'/dashboard'}
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/projects/:user"
                                    element={<Projects />}
                                />
                                <Route path="/catalog" element={<Catalog />} />
                                <Route
                                    path="/createLight/:ids"
                                    element={<RoomDetails />}
                                />

                                <Route
                                    path="/create-project/:user"
                                    element={<CreateProjectPage />}
                                />
                                <Route
                                    path="/unauthorized"
                                    element={<Unauthorized />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
