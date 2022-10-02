import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Projects from './components/SingleProject/Projects';
import CreateProjectPage from './components/CreateProjectPage/CreateProjectPage';
import './index.scss';
import AllUserProjects from './components/AllUserProjects/AllUserProjects';

const App: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);

    return (
        <>
            <BrowserRouter>
                {user.email && <Navbar />}
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/catalog" element={<Navigate to="/login" />} />
                    <Route path="/projects/all" element={<AllUserProjects />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route
                        path="/create-project"
                        element={<CreateProjectPage />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
