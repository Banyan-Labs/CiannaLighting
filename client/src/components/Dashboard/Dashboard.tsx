import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import YourProjects from './YourProjects/YourProjects';

import './style/dashboard.scss';

const Dashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);

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
