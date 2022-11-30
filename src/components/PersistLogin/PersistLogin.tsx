import React, { useState, useEffect } from 'react';
import useParams from '../../app/utils';
import { Outlet } from 'react-router-dom';
import { refreshToken } from '../../redux/actions/authActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSpecFile } from '../../redux/actions/lightActions';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAppSelector(({ auth: user }) => user);
    const {projectId} = useAppSelector(({project})=> project)
    // const {projectId}
    const userId = useParams('_id');
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    console.log("ATTAHCMENTS BEFORE THING: ", projectId)
    const projId = projectId
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshToken());
            } catch (error) {
                console.log("Error in persistLogin: ",error);
                throw error;
            } finally {
                isMounted && setIsLoading(false);
                dispatch(setSpecFile({"projId": projId, "edit": ""}, false))
            }
        };
        
        userId || !token ? verifyRefreshToken() : setIsLoading(false);
        
        () => (isMounted = false);
    }, []);
    console.log("attchAFTER: ", projectId);
    // 

    return <>{isLoading && !user._id ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
