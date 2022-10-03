import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import YourProjects from './YourProjects/YourProjects';

import './style/dashboard.scss';
import { getAllRegions, getAllStatus } from '../../redux/actions/filterActions';

const Dashboard: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(({ auth: user }) => user);

    // Getting region and status for store
    useEffect(() => {
        dispatch(getAllStatus());
        dispatch(getAllRegions());
    }, []);

    return (
        <>
            <YourProjects />
        </>
    );
};

export default Dashboard;
