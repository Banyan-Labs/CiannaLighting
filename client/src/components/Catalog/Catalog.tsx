import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppProps } from '../../App';

import './style/catalog.scss';

const Catalog: FC<AppProps> = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to='/login' />
      ) : (
        <>This is catalog page.</>
      )}
    </>
  );
};

export default Catalog;
