import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar/Navbar';
import YourProjects from './YourProjects/YourProjects';
import useParams from '../../app/utils';

import './style/dashboard.scss';
import { refreshToken } from '../../redux/actions/authActions';

const Dashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    // const userId = useParams('_id');
    // console.log(userId);
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (!user._id && userId) dispatch(getUser(userId));
    // }, []);
    return (
        <>
            <Navbar />
            <YourProjects />
        </>
    );
};

export default Dashboard;
