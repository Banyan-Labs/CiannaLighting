import React, { FC, useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import { ROLES } from '../../app/constants';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { getAllUsers } from '../../redux/actions/usersActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './styles/UsersTable.scss';

const UsersTable: FC = () => {
    const { users } = useAppSelector(({ users: users }) => users);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [sortedData, setSortedData] = useState<any>([]);
    const [sortDirection, setSortDirection] = useState(0);
    const [currentSort, setCurrentSort] = useState('');
    const utilizedData = users;
    useEffect(() => {
        if (!users.length) {
            dispatch(getAllUsers());
            setSortToDefault();
        }
    }, []);
    const setSortToDefault = () => {
        setSortedData(users);
        setSortDirection(0);
        setCurrentSort('');
    };
    const triggerDirection = (field: string) => {
        if (field == currentSort) {
            if (sortDirection == 0) {
                setSortDirection(1);
                setUpSortTrigger(field, 1);
            } else if (sortDirection == 1) {
                setSortDirection(2);
                setUpSortTrigger(field, 2);
            } else {
                setSortDirection(0);
                setUpSortTrigger(field, 0);
            }
        } else {
            setSortDirection(1);
            setUpSortTrigger(field, 1);
        }
    };
    const setUpSortTrigger = (field: string, direction: number) => {
        const sorted: any = {
            0: utilizedData,
            1: utilizedData.slice().sort((a: any, b: any) => {
                if (a[field] < b[field]) {
                    return -1;
                }
                if (a[String(field)] > b[String(field)]) {
                    return 1;
                }
                return 0;
            }),
            2: utilizedData.slice().sort((a: any, b: any) => {
                if (b[String(field)] < a[String(field)]) {
                    return -1;
                }
                if (b[String(field)] > a[field]) {
                    return 1;
                }
                return 0;
            }),
        };
        setSortedData(sorted[direction]);
        setCurrentSort(field);
    };
    const sortDisplay = (field: string) => {
        const directionCall: any = {
            0: '',
            1: <FaChevronUp className="sort-chevron" />,
            2: <FaChevronDown className="sort-chevron" />,
        };
        if (field == currentSort) {
            return directionCall[sortDirection];
        } else {
            return directionCall[0];
        }
    };

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
                        <td onClick={()=> triggerDirection('name')}>Name {sortDisplay('name')}</td>
                        <td onClick={()=> triggerDirection('email')}>Email{ sortDisplay('email')}</td>
                        <td onClick={()=> triggerDirection('role')}>Role {sortDisplay('role')}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { (sortedData.length ? sortedData : users).map((user:any) => (
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
                    )) }
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
