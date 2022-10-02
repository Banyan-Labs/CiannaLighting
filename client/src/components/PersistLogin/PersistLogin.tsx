import React, { FC, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUser, refreshToken } from '../../redux/actions/authActions';
import { setError } from '../../redux/reducers/authSlice';

const PersistLogin: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { accessToken } = useAppSelector(
        ({ auth: accessToken }) => accessToken
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    }, []);

    useEffect(() => {
        if (accessToken && user) {
            dispatch(getUser(user._id));
        }
    }, [accessToken, user]);
    return <>{!user && !accessToken ? <Outlet /> : true}</>;
};

export default PersistLogin;
