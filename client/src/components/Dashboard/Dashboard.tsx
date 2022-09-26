import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import YourProjects from './YourProjects/YourProjects';

import './style/dashboard.scss';

const Dashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    // const dispatch = useAppDispatch()
    // useEffect(() => {

    // }, [])

    return (
        <>
            {user.isAuth === true ? (
                <>
                    <YourProjects />
                </>
            ) : (
                <>
                    <Navigate to="/login" />
                </>
            )}
        </>
    );
};

export default Dashboard;
