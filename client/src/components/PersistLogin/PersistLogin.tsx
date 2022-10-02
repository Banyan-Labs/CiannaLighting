import React, { FC, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { refreshToken } from '../../redux/actions/authActions';

const PersistLogin: FC = () => {
    const { accessToken } = useAppSelector(
        ({ auth: accessToken }) => accessToken
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshToken());
            } catch (error) {
                console.log(error);
            }
        };

        !accessToken && verifyRefreshToken();

        return () => (isMounted = false);
    }, []);
    return <></>;
};

export default PersistLogin;
