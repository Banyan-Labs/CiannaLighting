import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useParams } from '../../app/utils';
import { refreshToken } from '../../redux/actions/authActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSpecFile } from '../../redux/actions/lightActions';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAppSelector(({ auth: user }) => user);
    const { projectId } = useAppSelector(({ project }) => project);
    const userId = useParams('_id');
    const dispatch = useAppDispatch();
    const token: string = user.token;
    const projId = projectId;
    
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshToken());
            } catch (error: any) {
                throw new Error(error.message);
            } finally {
                isMounted && setIsLoading(false);
                if (projectId && projId) {
                    dispatch(setSpecFile({ projId: projId, edit: '' }, false));
                }
            }
        };

        userId || !token ? verifyRefreshToken() : setIsLoading(false);

        () => (isMounted = false);
    }, []);

    return <>{isLoading && !user._id ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
