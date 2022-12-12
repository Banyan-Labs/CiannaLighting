import React, { FC } from 'react';
import Settings from './Settings';
import Activity from './Activity';
import Inventory from '../Inventory/Inventory';
import UsersTable from './UsersTable';
import RequireAuth from '../RequireAuth/RequireAuth';
import { ROLES } from '../../app/constants';
import { adminLinks } from './links';
import { useAppSelector } from '../../app/hooks';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import './styles/AdminDashboard.scss';

const AdminDashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const location = useLocation();

    return (
        <div className="admin-dashboard-container">
            <div className="admin-sidebar-container">
                {adminLinks
                    .slice()
                    .filter((link) =>
                        link.text === 'Users' && user.role != ROLES.Cmd
                            ? ''
                            : link
                    )
                    .map((link, index) => (
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
                    <Route path="/" element={<Inventory />} />

                    <Route element={<RequireAuth roles={[ROLES.Cmd]} />}>
                        <Route path="/users" element={<UsersTable />} />
                    <Route path="/activity" element={<Activity />} />   
                    </Route>
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
