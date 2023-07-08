import React, { FC, useEffect, useState, SyntheticEvent, useCallback } from 'react';
import { FaPlus, FaChevronUp, FaChevronDown, FaPlay, FaUserAltSlash, FaUserCheck } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri';

import CreateUserModal from './CreateUserModal';
import { axiosPrivate } from '../../api/axios';
import { ROLES } from '../../app/constants';
import { getAllUsers } from '../../redux/actions/usersActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CreateUserType, UserType } from '../../app/typescriptTypes';

import './styles/UsersTable.scss';

const UsersTable: FC = () => {
    const { users, lastStatus } = useAppSelector(({ users }) => users);
    const dispatch = useAppDispatch();
    const [curUser, setCurUser] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [sortedData, setSortedData] = useState<UserType[]>([]);
    const [sortDirection, setSortDirection] = useState(0);
    const [currentSort, setCurrentSort] = useState('');
    const utilizedData = users;
    const [edit, setEdit] = useState<boolean>(false);
    const [options, setOptions] = useState<boolean>(false);
    const [optionIndex, setOptionIndex] = useState<number>(-1);
    const [apiMessage, setApiMessage] = useState<string>('');
    const [userDetails, setUserDetails] = useState<CreateUserType>({
        name: '',
        email: '',
        role: '1212',
        password: '',
    });
    const [, updateState] = useState<unknown>();

    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        // if (!users.length) {
        dispatch(getAllUsers());
        setSortToDefault();
        // }
    }, []);
    useEffect(() => {
        const toastEle = document.getElementById('toast');

        if (toastEle) {
            if (apiMessage) {
                toastEle.style.display = 'block';

                setTimeout(() => {
                    toastEle.style.display = 'none';

                    setApiMessage('');
                    dispatch(getAllUsers());
                }, 3000);
            }
        }
    }, [apiMessage]);

    const setMini = (dex: number) => {
        setOptions(true);
        setOptionIndex(dex);
    };
    const unsetMini = () => {
        setOptions(false);
        setOptionIndex(-1);
    };
    const activateEdit = (user: any) => {
        setUserDetails({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
        });
        setEdit(true);
        setOpenModal(true);
        setCurUser(user._id);
    };
    const closeAndGet = () => {
        setOpenModal(false);
        dispatch(getAllUsers());
        setApiMessage(lastStatus)
    };
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

    const handleToggleUserStatus = async (
        event: SyntheticEvent,
        userId: string
    ) => {
        event.preventDefault();

        const axiosPriv = axiosPrivate();
        const response = await axiosPriv.put(`/cmd/toggle-user/${userId}`);

        if (response.status === 200) {
            setApiMessage(response.data.message);
        } else {
            setApiMessage('Unable to toggle user status');
        }
        
        // dispatch(getAllUsers());
        unsetMini();
        forceUpdate();
    };
    console.log(sortedData)

    return (
        <>
            <div id="toast">
                <div className="message-wrapper">
                    <span className="message">{apiMessage}</span>
                </div>
            </div>
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
                        <td onClick={() => triggerDirection('name')}>
                            Name {sortDisplay('name')}
                        </td>
                        <td onClick={() => triggerDirection('email')}>
                            Email{sortDisplay('email')}
                        </td>
                        <td onClick={() => triggerDirection('role')}>
                            Role {sortDisplay('role')}
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {(sortedData.length ? sortedData : users).map(
                        (user: UserType, index: number) => (
                            <tr
                                key={user._id}
                                className="user-table-row"
                                style={
                                    !user.isActive
                                        ? { background: '#ccc', opacity: 0.6 }
                                        : {}
                                }
                            >
                                <th
                                    style={
                                        user.resetPasswordRequest
                                            ? { color: 'red', opacity: 0.5 }
                                            : {}
                                    }
                                >
                                    {(!user.isActive ? <FaUserAltSlash /> : <FaUserCheck className='active-user' />)}{'\xa0\xa0\xa0'}{user.name}
                                </th>
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
                                <td
                                    className="button-td"
                                    onMouseOver={() => setMini(index)}
                                    onMouseLeave={() => unsetMini()}
                                >
                                    <button className="user-options-button">
                                        <BsThreeDots className="options-dots" />
                                        {options && optionIndex === index && (
                                            <div className="mini-modal-contain">
                                                <div
                                                    className="mini-modal-link"
                                                    onClick={() =>
                                                        activateEdit(user)
                                                    }
                                                >
                                                    <FaPencilAlt />
                                                    <p>Edit</p>
                                                </div>
                                                <div
                                                    className="mini-modal-link"
                                                    onClick={(e) =>
                                                        handleToggleUserStatus(
                                                            e,
                                                            user._id
                                                        )
                                                    }
                                                >
                                                    {user.isActive ? (
                                                        <RiArchiveDrawerFill />
                                                    ) : (
                                                        <FaPlay />
                                                    )}
                                                    <p>
                                                        {user.isActive
                                                            ? 'Archive'
                                                            : 'Restore'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
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
                    closeAndGet={closeAndGet}
                />
            )}
        </>
    );
};

export default UsersTable;
