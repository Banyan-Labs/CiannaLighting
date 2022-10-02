import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import './style/style.scss';

const AllUserProjects: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    return (
        <>
            {Object.keys(user).length === 0 ? (
                <Navigate to="/login" />
            ) : (
                <>
                    <div className="all-user-projects-container">
                        <p>
                            {/* This is for all users projects. Need to pull data and display all user
              projects in grid. */}
                        </p>
                    </div>
                </>
            )}
        </>
    );
};

export default AllUserProjects;
