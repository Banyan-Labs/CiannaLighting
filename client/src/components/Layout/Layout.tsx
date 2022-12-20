import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
    const { user } = useAppSelector(({ auth: user }) => user);

    return (
        <>
            {user._id && <Navbar />}
            <Outlet />
        </>
    );
};

export default Layout;
