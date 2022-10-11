import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import YourProjects from './YourProjects/YourProjects';

import './style/dashboard.scss';
import { getAllRegions, getAllStatus } from '../../redux/actions/filterActions';

const Dashboard: FC = () => {
    const dispatch = useAppDispatch();

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
