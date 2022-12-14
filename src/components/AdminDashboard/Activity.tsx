import React, { FC, useEffect } from 'react';
import './styles/AdminDashboard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTheLog, getAllLogs } from '../../redux/actions/authActions';
import { FaRegTrashAlt } from 'react-icons/fa';

const Activity: FC = () => {
    const { logs } = useAppSelector(({ auth: user }) => user);
    const logsDisplay = logs.length > 9 ? logs.splice(0,7) : logs;
    const dispatch = useAppDispatch();
    
    const allUserLogs = logsDisplay?.map((log, index) => {
        const RDate = log?.updatedAt !== '' ? log?.updatedAt : log?.createdAt
        const date = new Date(Date.parse(RDate)).toDateString();

        const deleteLog = async(_id: string) => {
           await dispatch(deleteTheLog(_id))
           await dispatch(getAllLogs())
        };
        return (
            <tbody key={index}>
                <tr id='log-table-container' className="projects-table-dynamic-row ">
                    <th className="projects-table-dynamic-name ">
                        {log.name}
                    </th>
                    <td className="projects-table-dynamic-designer log-table">
                        {log.ipAddress}
                    </td>
                    <td className="projects-table-dynamic-region log-table">
                        {log.role === '6677' ? 'Admin' : 'User'}
                    </td>
                    <td className="projects-table-dynamic-region log-table">
                        { 'Updated' } <br />
                        <span>{date}</span>
                    </td>
                    <td className="projects-table-dynamic-region log-table">
                        { "Created" } <br />
                        <span>{date}</span>
                    </td>
                    <td className="projects-table-dynamic-region">
                    <FaRegTrashAlt className='delete-log' onClick={()=> deleteLog(log?._id)}
                    />
                    </td>
                </tr>
            </tbody>
        );
    });

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
                                    <td className="log-name" >
                                        Name 
                                    </td>
                                    <td className="log-table">
                                        IP Address
                                    </td>
                                    <td className="log-table">
                                        Role
                                    </td>
                                    <td className="log-table">
                                        Updated
                                    </td>
                                    <td className="log-table">
                                        Created
                                    </td>
                                </tr>
                            </thead>
                            { allUserLogs }
                        </table>
                    </div>
        </div>
    );
};

export default Activity;