import React, { FC, useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import { ROLES } from '../../app/constants';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { getAllUsers } from '../../redux/actions/usersActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CreateUserType } from '../../app/typescriptTypes';
import { FaPencilAlt } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri'
import './styles/UsersTable.scss';

const UsersTable: FC = () => {
    const { users } = useAppSelector(({ users: users }) => users);
    const dispatch = useAppDispatch();
    const [curUser, setCurUser] = useState<string>('')
    const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [options, setOptions] = useState<boolean>(false);
    const [optionIndex, setOptionIndex ] = useState<number>(-1)
    const [userDetails, setUserDetails] = useState<CreateUserType>({
        name: '',
        email: '',
        role: '1212',
        password: ''
    });
    useEffect(() => {
        // if (!users.length) {
            dispatch(getAllUsers());
        // }
    }, []);
    console.log(users)
    const setMini = (dex: number) =>{
        setOptions(true);
        setOptionIndex(dex)
    }
    const unsetMini = () =>{
        setOptions(false);
        setOptionIndex(-1)
    }
    const activateEdit = (user: any) =>{
        setUserDetails({
            name: user.name,
            email: user.email,
            role: user.role,
            password: ''
        });
        setEdit(true);
        setOpenModal(true);
        setCurUser(user._id)
    }
    const closeAndGet = () =>{
        setOpenModal(false);
         dispatch(getAllUsers());
    }

    return (
        <>
            <div className="users-table-header-container">
                <div className="users-table-title">
                    <h1>All Users ({users.length})</h1>
                    <p>Manage users and account permissions</p>
                </div>
                <button
                    className="new-user-button"
                    onClick={() => setOpenModal(!openModal)}
                >
                    <FaPlus />
                    New User
                </button>
            </div>
            <table className="users-table">
                <thead>
                    <tr className="users-table-headers">
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any, index: number) => (
                        <tr key={user._id} className="user-table-row">
                            <th>{user.name}</th>
                            <td>{user.email}</td>
                            <td>
                                {Object.entries(ROLES).map((role) => {
                                    if (role[1] === user.role) {
                                        if (role[0] === 'Cmd') {
                                            return 'Admin';
                                        } else if (role[0] === 'Int') {
                                            return 'Employee';
                                        } else {
                                            return role[0];
                                        }
                                    }
                                })}
                            </td>
                            <td className="button-td" onMouseOver={()=>setMini(index)} onMouseLeave={()=> unsetMini()}>
                           
                                <button className="user-options-button" >
                                    <BsThreeDots className='options-dots'/>
                                </button>
                                
                            {
                                options && optionIndex === index && (
                                <div className='mini-modal-contain'>
                                    <div className="mini-modal-link" onClick={()=> activateEdit(user)}><FaPencilAlt/><p>Edit</p></div>
                                    <div className="mini-modal-link">{user.isActive ? <RiArchiveDrawerFill/> : <FaPlay/>}<p>{user.isActive ? "Archive" : "Restore"}</p></div>
                                </div>
                                )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {openModal && (
                <CreateUserModal
                    openModal={openModal}
                    closeModal={setOpenModal}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    edit={edit}
                    setEdit={setEdit} 
                    curUser={curUser}
                    closeAndGet={closeAndGet}                />
            )}
        </>
    );
};

export default UsersTable;
