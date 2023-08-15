import React from 'react';
import { useAppSelector } from 'app/hooks';


const AlertModal = () => {

   const { alertOpen } = useAppSelector(({ modal: alertOpen }) => alertOpen);

  return (
    <>
            {alertOpen}

            {/* //  <Navbar /> */}
             
            {/* <Outlet /> */}
        </>
  )
}

export default AlertModal;