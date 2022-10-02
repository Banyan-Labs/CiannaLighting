import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useParams from '../../app/utils';
import { refreshToken } from '../../redux/actions/authActions';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAppSelector(({ auth: user }) => user);
    const userId = useParams('_id');
    const userRole = localStorage.getItem('role');
    console.log(userRole, 'pers');
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshToken());
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        userId ? verifyRefreshToken() : setIsLoading(false);
        () => (isMounted = false);
    }, []);

    // useEffect(() => {
    //     if (!user._id && userId) {
    //         dispatch(getUser(userId));
    //         setIsLoading(false);
    //     }
    // }, [userId]);

    return <>{isLoading && !user._id ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
