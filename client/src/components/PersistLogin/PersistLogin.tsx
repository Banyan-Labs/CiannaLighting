import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useParams } from '../../app/utils';
import { refreshToken } from '../../redux/actions/authActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAppSelector(({ auth: user }) => user);
    const userId = useParams('_id');
    const dispatch = useAppDispatch();
    const token: string = user.token;

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshToken());
            } catch (error: any) {
                throw new Error(error.message);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        userId || !token ? verifyRefreshToken() : setIsLoading(false);

        () => (isMounted = false);
    }, []);

    return <>{isLoading && !user._id ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
