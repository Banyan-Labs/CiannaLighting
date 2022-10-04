import React, { FC, useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const RequireAuth: FC<{ roles: string[] }> = ({ roles }) => {
    const location = useLocation();
    const { user } = useAppSelector(({ auth: user }) => user);

    return user.role && roles.includes(user.role) ? (
        <Outlet />
    ) : user.role ? (
        <Navigate to="/unauthorized" state={{ from: location }} /> // only applies when we want to restrict access to certain roles. ex: the admin page will only be accessible/viewable to users with the role of admin.
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
