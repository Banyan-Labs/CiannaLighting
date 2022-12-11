import React, { FC, useEffect } from 'react';
import './styles/AdminDashboard.scss';
import { useAppDispatch } from '../../app/hooks';
import { getAllLogs } from '../../redux/actions/authActions';

const Activity: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllLogs());
    }, []);
    return (
        <div className="admin-dashboard-container">
           <h1>HI THERE</h1>
        </div>
    );
};

export default Activity;