import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Unauthorized: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            user._id
                ? navigate('/dashboard?_id=' + user._id)
                : navigate('/login');
        }, 4000);
    }, []);

    return (
        <div>
            <h2>403: Forbidden</h2>
            <p>Redirecting to home...</p>
        </div>
    );
};

export default Unauthorized;
