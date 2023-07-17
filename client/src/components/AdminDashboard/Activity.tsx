import React, { FC, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import uuid from 'react-uuid';

import './styles/AdminDashboard.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTheLog, getAllLogs } from '../../redux/actions/authActions';

const Activity: FC = () => {
    const { logs } = useAppSelector(({ auth: user }) => user);
    const dispatch = useAppDispatch();
    const deleteLog = async (_id: string) => {
        await dispatch(deleteTheLog(_id));
        await dispatch(getAllLogs());
    };

    useEffect(() => {
        dispatch(getAllLogs());
    }, []);

    return (
        <div>
            <h2>Recent Logs</h2>
            <div>
                {/* I used some class names from the dashboard table. changes need to be made just put # id's on them*/}
                <table className="dashboard-all-projects-table">
                    <thead className="table-headers">
                        <tr>
                            <td>Name</td>
                            <td>IP Address</td>
                            <td>Role</td>
                            <td>Last Login</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {logs?.map((log) => {
                            const RDate = log?.updatedAt !== '' ? log?.updatedAt : log?.createdAt;
                            const date = new Date(Date.parse(RDate)).toDateString();
                            const time = new Date(Date.parse(RDate)).toLocaleTimeString();

                            return (
                                <tr
                                    key={uuid()}
                                    id="log-table-container"
                                    className="projects-table-dynamic-row"
                                >
                                    <td className="col-3 m-0 p-0">
                                        {log.name}
                                    </td>
                                    <td className="projects-table-dynamic-designer ">
                                        {log.ipAddress?.replace("::ffff:", "")}
                                    </td>
                                    <td className="projects-table-dynamic-region ">
                                        {log.role === '6677' ? 'Admin' : 'User'}
                                    </td>
                                    <td className="projects-table-dynamic-region ">
                                        <span>{date + ' @ ' + time}</span>
                                    </td>
                                    <td
                                        className="projects-table-dynamic-region"
                                        onClick={() => deleteLog(log._id)}
                                    >
                                        <FaRegTrashAlt className="delete-log" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Activity;
