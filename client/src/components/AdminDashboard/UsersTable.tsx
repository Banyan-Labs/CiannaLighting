import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { FaPlus } from 'react-icons/fa';
import './styles/UsersTable.scss';

const UsersTable: FC = () => {
    const { users } = useAppSelector(({ users: users }) => users);

    return (
        <div className="users-table-container">
            <h1>All Users ({users.length})</h1>
            <p>Manage users and account permissions</p>
            <button className="new-user-button">
                <FaPlus />
                New User
            </button>
        </div>
    );
};

export default UsersTable;
