import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import YourProjects from './YourProjects/YourProjects';

import './style/dashboard.scss';

const Dashboard: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login" + user.name);
  }, [user]);
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
