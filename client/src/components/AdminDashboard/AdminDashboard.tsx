import React, { FC } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import Settings from './Settings';
import Activity from './Activity';
import Inventory from '../Inventory/Inventory';
import UsersTable from './UsersTable';
import RequireAuth from '../RequireAuth/RequireAuth';
import { ROLES } from '../../app/constants';
import { adminLinks } from './links';
import { useAppSelector } from '../../app/hooks';
import { axiosPrivate } from 'api/axios';
import logging from 'config/logging';

import './styles/AdminDashboard.scss';

const AdminDashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const location = useLocation();

    const resetDB = async () => {
        const axiosPriv = axiosPrivate();

        try {
            const deletedItems = await axiosPriv.get('cmd/reset-db');

            if (deletedItems) {
                logging.info(deletedItems.data);
            }

            return deletedItems;
        } catch (error: any) {
            logging.error(error);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-sidebar-container">
                {adminLinks
                    .slice()
                    .filter((link) =>
                        link.text === 'Users' && user.role != ROLES.Admin
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
                            {/* remove 'false' condition to render rest DB button */}
                            {index === adminLinks.length - 1 && false && (
                                <button
                                    className="d-block mt-4"
                                    onClick={resetDB}
                                >
                                    Reset DB
                                </button>
                            )}
                        </div>
                    ))}
            </div>
            <div className="admin-content-section m-5 col-lg-9 col-xl-9">
                <Routes>
                    <Route path="/" element={<Inventory />} />

                    <Route element={<RequireAuth roles={[ROLES.Admin]} />}>
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
