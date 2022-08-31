import React, { FC, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./style/dashboard.scss";
import NewModal from '../ModalNewProjects/NewModal'

import { AppProps } from "../../App";
import { Navigate } from "react-router-dom";


const Dashboard: FC<AppProps> = ({ user, setUser }) => {

  // Destructure and assign "useState" hook for "New Project" modal.
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Navbar user={user} setUser={setUser} />
          This is the dashboard.
          {/* <--- Test button for "New Project" Modal ---> 
              When the button is clicked, the "stOpenModal" will 
              toggle to true.
          */}
          <button className='openModalBtn' onClick={() => {setOpenModal(true);}}>
            New Project
          </button>
          {openModal && <NewModal  openModal={ openModal } closeModal={ setOpenModal } />}
          {/* <--- END "New Project" Modal ---> */}
        </>
      )}
    </>
  );
};

export default Dashboard;
