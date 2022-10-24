import React, { FC, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUserProjects } from '../../redux/actions/projectActions';

const RequireAuth: FC<{ roles: string[] }> = ({ roles }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user } = useAppSelector(({ auth: user }) => user);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserProjects(user._id));
        };
        fetchData();
    }, [user._id]);

    return user.role && roles.includes(user.role) ? (
        <Outlet />
    ) : user.role ? (
        <Navigate to="/unauthorized" state={{ from: location }} /> // only applies when we want to restrict access to certain roles. ex: the admin page will only be accessible/viewable to users with the role of admin.
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
