import React, { FC } from 'react';
import Settings from './Settings';
import Inventory from '../Inventory/Inventory';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { adminLinks } from './links';
import UsersTable from './UsersTable';
import './styles/AdminDashboard.scss';
import { ROLES } from '../../app/constants';
import RequireAuth from '../RequireAuth/RequireAuth';

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
                    </Route>
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
