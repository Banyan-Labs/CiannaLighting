import React, { FC, useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';
import YourProjects from './YourProjects/YourProjects';
import { getAllRegions } from '../../redux/actions/filterActions';
import { getCatalogItems } from '../../redux/actions/lightActions';

import './style/dashboard.scss';

const Dashboard: FC = () => {
    const dispatch = useAppDispatch();

    // Getting region and status for store
    useEffect(() => {
        dispatch(getAllRegions());
        dispatch(getCatalogItems());
    }, []);

    return (
        <>
            <YourProjects />
        </>
    );
};

export default Dashboard;
