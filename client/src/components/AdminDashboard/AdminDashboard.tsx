import React, { FC, useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { adminLinks } from './links';
import UsersTable from './UsersTable';
import './styles/AdminDashboard.scss';

const AdminDashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    return (
        <div className="admin-dashboard-container">
            <div className="admin-sidebar-container">
                {adminLinks.map((link, index) => (
                    <div key={index} className="sidebar-link-container">
                        <Link
                            to={link.link + '?_id=' + user._id}
                            className={
                                link.link === location.pathname
                                    ? 'sidebar-link active-sidebar-link'
                                    : 'sidebar-link'
                            }
                        >
                            {link.text}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="admin-content-section">
                <Routes>
                    <Route path="/" element={<UsersTable />} />
                    <Route path="/cmd/settings" element={<h1>Settings</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
