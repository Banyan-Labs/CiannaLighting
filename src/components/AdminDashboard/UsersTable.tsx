import React, { FC, useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import useParams from '../../app/utils';
import { ROLES } from '../../app/constants';
import { FaPlus } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { getAllUsers } from '../../redux/actions/usersActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './styles/UsersTable.scss';

const UsersTable: FC = () => {
    const { users } = useAppSelector(({ users: users }) => users);
    const [userId] = useParams('_id');
    const filteredUsers = users.filter((data) => data._id !== userId);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        if (!users.length) {
            dispatch(getAllUsers());
        }
    }, []);

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
                    {filteredUsers.map((user) => (
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
                            <td className="button-td">
                                <button className="user-options-button">
                                    <BsThreeDots />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModal && (
                <CreateUserModal
                    openModal={openModal}
                    closeModal={setOpenModal}
                />
            )}
        </>
    );
};

export default UsersTable;
